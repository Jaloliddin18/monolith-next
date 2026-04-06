import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress } from '@mui/material';
import { GET_FAVORITES } from '../../../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../../../apollo/user/mutation';
import { userVar } from '../../../apollo/store';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { T } from '../../types/common';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

interface MiniWishlistProps {
	open: boolean;
	onClose: () => void;
}

const MiniWishlist = ({ open, onClose }: MiniWishlistProps) => {
	const user = useReactiveVar(userVar);
	const [wishlistItems, setWishlistItems] = useState<Furniture[]>([]);
	const [total, setTotal] = useState(0);

	const { loading, refetch } = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only',
		skip: !open || !user?._id,
		variables: { input: { page: 1, limit: 10 } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setWishlistItems(data?.getFavorites?.list ?? []);
			setTotal(data?.getFavorites?.metaCounter[0]?.total ?? 0);
		},
	});

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const handleRemove = async (id: string) => {
		try {
			await likeTargetFurniture({ variables: { input: id } });
			await refetch({ input: { page: 1, limit: 10 } });
			window.dispatchEvent(new Event('wishlistUpdated'));
			await sweetTopSmallSuccessAlert('Removed from wishlist', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message);
		}
	};

	const getImage = (f: Furniture) =>
		f.furnitureImages?.[0] ? `${REACT_APP_API_URL}/${f.furnitureImages[0]}` : PLACEHOLDER_IMG;

	const getDisplayPrice = (f: Furniture) =>
		f.furnitureLastChancePrice && f.furnitureLastChancePrice < f.furniturePrice
			? f.furnitureLastChancePrice
			: f.furniturePrice;

	if (!open) return null;

	return (
		<div id="mini-wishlist-sidebar">
			<div className="mini-wishlist-backdrop" onClick={onClose} />
			<div className="mini-wishlist-panel">
				{/* Header */}
				<div className="mini-wishlist-header">
					<div className="header-title">
						<h3>My Wishlist</h3>
						<span className="item-count">({total} Items)</span>
					</div>
					<button className="close-btn" onClick={onClose}>
						<CloseIcon />
					</button>
				</div>

				{loading ? (
					<div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
						<CircularProgress />
					</div>
				) : wishlistItems.length > 0 ? (
					<>
						{/* Items */}
						<div className="mini-wishlist-items">
							{wishlistItems.map((item) => {
								const displayPrice = getDisplayPrice(item);
								const hasDiscount = item.furnitureLastChancePrice && item.furnitureLastChancePrice < item.furniturePrice;
								const discountPercent = hasDiscount
									? Math.round(((item.furniturePrice - item.furnitureLastChancePrice!) / item.furniturePrice) * 100)
									: 0;

								return (
									<div className="wishlist-item" key={item._id}>
										<div className="wishlist-item-image">
											<img src={getImage(item)} alt={item.furnitureTitle} />
										</div>
										<div className="wishlist-item-details">
											<div className="wishlist-item-content">
												<p className="item-title">{item.furnitureTitle}</p>
												<div className="item-price-row">
													<span className="current-price">${displayPrice.toFixed(2)}</span>
													{hasDiscount && (
														<>
															<span className="original-price">${item.furniturePrice.toFixed(2)}</span>
															<span className="discount">({discountPercent}% off)</span>
														</>
													)}
												</div>
											</div>
											<button className="delete-btn" onClick={() => handleRemove(item._id)}>
												<DeleteOutlineIcon sx={{ fontSize: 22 }} />
											</button>
										</div>
									</div>
								);
							})}
						</div>

						{/* Actions */}
						<div className="mini-wishlist-actions">
							<Link href="/mypage/wishlist" className="btn-view-wishlist" onClick={onClose}>
								VIEW MY WISHLIST
							</Link>
							<Link href="/furniture" className="btn-continue-shopping" onClick={onClose}>
								CONTINUE SHOPPING
							</Link>
						</div>
					</>
				) : (
					<div className="empty-wishlist-state">
						<p className="empty-text">Your wishlist is empty</p>
						<Link href="/furniture" className="btn-shop-now" onClick={onClose}>
							SHOP NOW
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniWishlist;
