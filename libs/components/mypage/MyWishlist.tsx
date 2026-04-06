import { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Typography, IconButton, Button, Pagination, CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FAVORITES, GET_VISITED } from '../../../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../../../apollo/user/mutation';
import { Furniture } from '../../types/furniture/furniture';
import { OrdinaryInquiry } from '../../types/furniture/furniture.input';
import { FurnitureStatus } from '../../enums/furniture.enum';
import { REACT_APP_API_URL } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Messages } from '../../config';
import { T } from '../../types/common';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

const MyWishlist = () => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const [wishlistItems, setWishlistItems] = useState<Furniture[]>([]);
	const [wishlistTotal, setWishlistTotal] = useState(0);
	const [searchWishlist, setSearchWishlist] = useState<OrdinaryInquiry>({ page: 1, limit: 9 });

	const [visitedItems, setVisitedItems] = useState<Furniture[]>([]);
	const [visitedTotal, setVisitedTotal] = useState(0);
	const [searchVisited, setSearchVisited] = useState<OrdinaryInquiry>({ page: 1, limit: 4 });

	/** APOLLO REQUESTS **/

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const { loading: favoritesLoading, refetch: refetchFavorites } = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only',
		variables: { input: searchWishlist },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setWishlistItems(data?.getFavorites?.list ?? []);
			setWishlistTotal(data?.getFavorites?.metaCounter[0]?.total ?? 0);
		},
	});

	const { loading: visitedLoading } = useQuery(GET_VISITED, {
		fetchPolicy: 'network-only',
		variables: { input: searchVisited },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setVisitedItems(data?.getVisited?.list ?? []);
			setVisitedTotal(data?.getVisited?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/

	const handleRemoveFromWishlist = async (furnitureId: string) => {
		try {
			if (!user._id) throw new Error(Messages.NOT_AUTHENTICATED);
			await likeTargetFurniture({ variables: { input: furnitureId } });
			await refetchFavorites({ input: searchWishlist });
			await sweetTopSmallSuccessAlert('Removed from wishlist', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message);
		}
	};

	const wishlistPaginationHandler = (_: T, value: number) => {
		setSearchWishlist((prev) => ({ ...prev, page: value }));
	};

	const visitedPaginationHandler = (_: T, value: number) => {
		setSearchVisited((prev) => ({ ...prev, page: value }));
	};

	const getItemImage = (furniture: Furniture) => {
		return furniture.furnitureImages?.[0]
			? `${REACT_APP_API_URL}/${furniture.furnitureImages[0]}`
			: PLACEHOLDER_IMG;
	};

	const getDiscount = (furniture: Furniture) => {
		const clearancePrice = furniture.furnitureLastChancePrice;
		if (clearancePrice && clearancePrice < furniture.furniturePrice) {
			const percent = Math.round(((furniture.furniturePrice - clearancePrice) / furniture.furniturePrice) * 100);
			return { hasDiscount: true, discountPrice: clearancePrice, percent };
		}
		return { hasDiscount: false, discountPrice: 0, percent: 0 };
	};

	const getRating = (furniture: Furniture) => {
		return furniture.furnitureRank ? (furniture.furnitureRank / 10).toFixed(1) : '4.5';
	};

	return (
		<Stack className="wishlist-content">
			<Typography className="content-title">My Wishlist({wishlistTotal})</Typography>

			{favoritesLoading ? (
				<Stack alignItems="center" py="40px">
					<CircularProgress />
				</Stack>
			) : wishlistItems.length === 0 ? (
				<Box className="placeholder-content">Your wishlist is empty</Box>
			) : (
				<Stack className="wishlist-items">
					{wishlistItems.map((furniture) => {
						const { hasDiscount, discountPrice, percent } = getDiscount(furniture);
						const isOutOfStock = furniture.furnitureStatus === FurnitureStatus.DISCONTINUED;
						const isHovered = hoveredId === furniture._id;

						return (
							<Box
								key={furniture._id}
								className="wishlist-item"
								onMouseEnter={() => setHoveredId(furniture._id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<Box className="wishlist-item-image">
									<Link href={`/furniture/detail?id=${furniture._id}`}>
										<img src={getItemImage(furniture)} alt={furniture.furnitureTitle} />
									</Link>
									{isOutOfStock && (
										<Box className="out-of-stock-badge">
											<Typography>Out of stock</Typography>
										</Box>
									)}
									{isHovered && !isOutOfStock && (
										<Button
											className="move-to-cart-btn"
											onClick={() => router.push(`/furniture/detail?id=${furniture._id}`)}
										>
											MOVE TO CART
										</Button>
									)}
								</Box>

								<Stack className="wishlist-item-details">
									<Stack className="item-top-row" direction="row" justifyContent="space-between" alignItems="flex-start">
										<Stack gap="8px">
											<Stack direction="row" alignItems="center" gap="8px">
												<Box className="rating-badge">
													<Typography className="rating-value">{getRating(furniture)}</Typography>
													<img src="/icons/star_icon.svg" alt="star" width={12} height={12} />
												</Box>
												<Typography className="review-count">({furniture.furnitureViews?.toLocaleString() || 0})</Typography>
											</Stack>
											<Link href={`/furniture/detail?id=${furniture._id}`}>
												<Typography className="item-title">{furniture.furnitureTitle}</Typography>
											</Link>
											<Stack direction="row" alignItems="center" gap="8px">
												<Typography className="item-price">
													${hasDiscount ? discountPrice.toFixed(2) : furniture.furniturePrice.toFixed(2)}
												</Typography>
												{hasDiscount && (
													<>
														<Typography className="item-price-old">${furniture.furniturePrice.toFixed(2)}</Typography>
														<Typography className="item-discount">({percent}% off)</Typography>
													</>
												)}
											</Stack>
										</Stack>
										<IconButton className="delete-btn" onClick={() => handleRemoveFromWishlist(furniture._id)}>
											<DeleteOutlineIcon sx={{ fontSize: 20, color: '#999' }} />
										</IconButton>
									</Stack>
								</Stack>
							</Box>
						);
					})}
				</Stack>
			)}

			{wishlistTotal > searchWishlist.limit && (
				<Stack alignItems="center" mt="24px">
					<Pagination
						count={Math.ceil(wishlistTotal / searchWishlist.limit)}
						page={searchWishlist.page}
						shape="circular"
						color="primary"
						onChange={wishlistPaginationHandler}
					/>
				</Stack>
			)}

			{wishlistItems.length > 0 && (
				<Button className="continues-shopping-btn" onClick={() => router.push('/furniture')}>
					CONTINUES SHOPPING
				</Button>
			)}

			{/* Recently Viewed */}
			{visitedItems.length > 0 && (
				<Stack className="recently-viewed-section" mt="40px">
					<Typography className="content-title">Recently Viewed({visitedTotal})</Typography>
					{visitedLoading ? (
						<Stack alignItems="center" py="24px">
							<CircularProgress />
						</Stack>
					) : (
						<Stack className="wishlist-items">
							{visitedItems.map((furniture) => {
								const { hasDiscount, discountPrice, percent } = getDiscount(furniture);
								const isOutOfStock = furniture.furnitureStatus === FurnitureStatus.DISCONTINUED;

								return (
									<Box key={furniture._id} className="wishlist-item">
										<Box className="wishlist-item-image">
											<Link href={`/furniture/detail?id=${furniture._id}`}>
												<img src={getItemImage(furniture)} alt={furniture.furnitureTitle} />
											</Link>
											{isOutOfStock && (
												<Box className="out-of-stock-badge">
													<Typography>Out of stock</Typography>
												</Box>
											)}
										</Box>

										<Stack className="wishlist-item-details">
											<Stack gap="8px">
												<Stack direction="row" alignItems="center" gap="8px">
													<Box className="rating-badge">
														<Typography className="rating-value">{getRating(furniture)}</Typography>
														<img src="/icons/star_icon.svg" alt="star" width={12} height={12} />
													</Box>
													<Typography className="review-count">({furniture.furnitureViews?.toLocaleString() || 0})</Typography>
												</Stack>
												<Link href={`/furniture/detail?id=${furniture._id}`}>
													<Typography className="item-title">{furniture.furnitureTitle}</Typography>
												</Link>
												<Stack direction="row" alignItems="center" gap="8px">
													<Typography className="item-price">
														${hasDiscount ? discountPrice.toFixed(2) : furniture.furniturePrice.toFixed(2)}
													</Typography>
													{hasDiscount && (
														<>
															<Typography className="item-price-old">${furniture.furniturePrice.toFixed(2)}</Typography>
															<Typography className="item-discount">({percent}% off)</Typography>
														</>
													)}
												</Stack>
											</Stack>
										</Stack>
									</Box>
								);
							})}
						</Stack>
					)}

					{visitedTotal > searchVisited.limit && (
						<Stack alignItems="center" mt="24px">
							<Pagination
								count={Math.ceil(visitedTotal / searchVisited.limit)}
								page={searchVisited.page}
								shape="circular"
								color="primary"
								onChange={visitedPaginationHandler}
							/>
						</Stack>
					)}
				</Stack>
			)}
		</Stack>
	);
};

export default MyWishlist;
