import React from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface WishlistItem {
	id: string;
	title: string;
	price: number;
	originalPrice: number;
	discountPercent: number;
	image: string;
}

const wishlistItems: WishlistItem[] = [
	{
		id: '1',
		title: 'Elegant Comfort Chair',
		price: 179.99,
		originalPrice: 224.99,
		discountPercent: 20,
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		id: '2',
		title: 'Modern Floating Bed',
		price: 764.25,
		originalPrice: 899.00,
		discountPercent: 15,
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		id: '3',
		title: 'Velvet Accent Chair',
		price: 129.99,
		originalPrice: 144.43,
		discountPercent: 10,
		image: '/img/furniture/luxury_chair.jpg',
	},
];

interface MiniWishlistProps {
	open: boolean;
	onClose: () => void;
}

const MiniWishlist = ({ open, onClose }: MiniWishlistProps) => {
	if (!open) return null;

	return (
		<div id="mini-wishlist-sidebar">
			<div className="mini-wishlist-backdrop" onClick={onClose} />
			<div className="mini-wishlist-panel">
				{/* Header */}
				<div className="mini-wishlist-header">
					<div className="header-title">
						<h3>My Wishlist</h3>
						<span className="item-count">({wishlistItems.length} Items)</span>
					</div>
					<button className="close-btn" onClick={onClose}>
						<CloseIcon />
					</button>
				</div>

				{wishlistItems.length > 0 ? (
					<>
						{/* Items */}
						<div className="mini-wishlist-items">
							{wishlistItems.map((item) => (
								<div className="wishlist-item" key={item.id}>
									<div className="wishlist-item-image">
										<img src={item.image} alt={item.title} />
									</div>
									<div className="wishlist-item-details">
										<div className="wishlist-item-content">
											<p className="item-title">{item.title}</p>
											<div className="item-price-row">
												<span className="current-price">${item.price.toFixed(2)}</span>
												<span className="original-price">${item.originalPrice.toFixed(2)}</span>
												<span className="discount">({item.discountPercent}% off)</span>
											</div>
										</div>
										<button className="delete-btn">
											<DeleteOutlineIcon sx={{ fontSize: 22 }} />
										</button>
									</div>
								</div>
							))}
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
