import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../config';
import { addToCart } from '../../utils/cartStorage';
import { sweetTopSmallSuccessAlert } from '../../sweetAlert';

interface ProductCardProps {
	furniture: Furniture;
	onLike?: (id: string) => void;
	isOutOfStock?: boolean;
	rating?: number;
	reviewCount?: number;
	originalPrice?: number;
	size?: 'default' | 'small';
}

const ProductCard = ({ furniture, onLike, isOutOfStock, rating: ratingProp, reviewCount: reviewCountProp, originalPrice, size = 'default' }: ProductCardProps) => {
	const router = useRouter();
	const [liked, setLiked] = useState(furniture?.likedByMe?.[0]?.myFavorite ?? false);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		setLiked(furniture?.likedByMe?.[0]?.myFavorite ?? false);
	}, [furniture?.likedByMe]);

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		addToCart(furniture);
		sweetTopSmallSuccessAlert('Added to cart', 800);
	};

	if (!furniture) return null;
	const { _id, furnitureTitle, furniturePrice, furnitureImages, furnitureBestseller, furnitureDiscount, furnitureLikes, furnitureViews, furnitureComments } = furniture;

	const primaryImage = furnitureImages?.[0]
		? `${REACT_APP_API_URL}/${furnitureImages[0]}`
		: '/img/furniture/luxury_chair.jpg';
	const secondaryImage = furnitureImages?.[1]
		? `${REACT_APP_API_URL}/${furnitureImages[1]}`
		: null;

	const reviewCount = reviewCountProp ?? furnitureComments ?? 0;
	const rating = ratingProp ?? 4.4;
	const filledStars = Math.round(rating);

	const handleClick = () => {
		router.push(`/furniture/detail?id=${_id}`, undefined, { scroll: false });
	};

	return (
		<Box
			className={`product-card${size === 'small' ? ' product-card-sm' : ''}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Box className="product-card-img" onClick={handleClick}>
				{/* Primary image */}
				<img
					className="img-primary"
					src={primaryImage}
					alt={furnitureTitle}
				/>
				{/* Secondary image (shown on hover if exists) */}
				{secondaryImage && (
					<img
						className={`img-secondary${isHovered ? ' visible' : ''}`}
						src={secondaryImage}
						alt={`${furnitureTitle} alternate`}
					/>
				)}

				{/* Badges top-left */}
				{furnitureDiscount > 0 && (
					<Box className="badge discount">-{furnitureDiscount}%</Box>
				)}
				{furnitureBestseller && !furnitureDiscount && (
					<Box className="badge bestseller">Best seller</Box>
				)}

				{/* View count top-right */}
				<Box className="view-count-badge">
					<VisibilityOutlinedIcon sx={{ fontSize: 11 }} />
					<span>{furnitureViews ?? 0}</span>
				</Box>

				{isOutOfStock && (
					<Box className="out-of-stock-overlay">
						<Typography className="out-of-stock-text">Out of stock</Typography>
					</Box>
				)}

				{/* ADD TO CART bar */}
				<Box className="add-to-cart-bar" onClick={handleAddToCart}>
					<ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
					<span>ADD TO CART</span>
				</Box>
			</Box>

			{/* Card info */}
			<Stack className="product-card-content" gap="6px">
				<Typography className="product-title" onClick={handleClick}>
					{furnitureTitle}
				</Typography>

				{/* Stars row */}
				<Stack className="stars-row" direction="row" alignItems="center" gap="2px">
					{[0, 1, 2, 3, 4].map((i) =>
						i < filledStars ? (
							<StarIcon key={i} sx={{ fontSize: 14, color: '#f4a614' }} />
						) : (
							<StarBorderIcon key={i} sx={{ fontSize: 14, color: '#bbb' }} />
						),
					)}
					<Typography className="rating-count">({reviewCount.toLocaleString()})</Typography>
				</Stack>

				{/* Price + like row */}
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Stack direction="row" alignItems="center" gap="8px">
						<Typography className="product-price">${furniturePrice.toFixed(2)}</Typography>
						{(originalPrice ?? (furnitureDiscount > 0 ? furniturePrice / (1 - furnitureDiscount / 100) : null)) && (
							<Typography className="product-price-old">
								${(originalPrice ?? furniturePrice / (1 - furnitureDiscount / 100)).toFixed(2)}
							</Typography>
						)}
					</Stack>

					<Box
						className={`like-btn${liked ? ' liked' : ''}`}
						onClick={(e) => {
							e.stopPropagation();
							const next = !liked;
							setLiked(next);
							onLike?.(_id);
							sweetTopSmallSuccessAlert(next ? 'Added to wishlist' : 'Removed from wishlist', 800);
						}}
					>
						{liked ? (
							<FavoriteIcon sx={{ fontSize: 22, color: '#a86464' }} />
						) : (
							<FavoriteBorderIcon sx={{ fontSize: 22, color: '#888' }} />
						)}
						<span>{furnitureLikes ?? 0}</span>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ProductCard;
