import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Typography } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../config';

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
	const { _id, furnitureTitle, furniturePrice, furnitureImages, furnitureBestseller, furnitureDiscount } = furniture;

	const image =
		furnitureImages?.[0] ? `${REACT_APP_API_URL}/${furnitureImages[0]}` : '/img/furniture/luxury_chair.jpg';

	const reviewCount = reviewCountProp ?? furniture.furnitureLikes ?? 0;
	const rating = ratingProp ?? 4.4;

	const handleClick = () => {
		router.push(`/furniture/detail?id=${_id}`);
	};

	return (
		<Box className={`product-card${size === 'small' ? ' product-card-sm' : ''}`}>
			<Box className="product-card-img" onClick={handleClick} style={{ cursor: 'pointer' }}>
				<img src={image} alt={furnitureTitle} />

				{furnitureBestseller && <Box className="badge bestseller">Best seller</Box>}
				{furnitureDiscount > 0 && <Box className="badge discount">-{furnitureDiscount}%</Box>}

				{isOutOfStock && (
					<Box className="out-of-stock-overlay">
						<Typography className="out-of-stock-text">Out of stock</Typography>
					</Box>
				)}

				<Box className="add-to-cart-bar" onClick={(e) => e.stopPropagation()}>
					ADD TO CART
				</Box>

				<Stack className="card-actions">
					<Box
						className="action-btn"
						onClick={(e) => {
							e.stopPropagation();
							onLike?.(_id);
						}}
					>
						<img src="/icons/Heart.svg" alt="Wishlist" width={24} height={24} />
					</Box>
					<Box className="action-btn" onClick={(e) => e.stopPropagation()}>
						<img src="/icons/Eye.svg" alt="View" width={24} height={24} />
					</Box>
					<Box className="action-btn" onClick={(e) => e.stopPropagation()}>
						<img src="/icons/ArrowsOutSimple.svg" alt="Expand" width={24} height={24} />
					</Box>
				</Stack>
			</Box>

			<Stack className="product-card-content" gap="8px">
				<Stack className="rating-row" direction="row" alignItems="center" gap="12px">
					<Box className="rating-badge">
						<Typography className="rating-value">{rating.toFixed(1)}</Typography>
						<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
					</Box>
					<Typography className="rating-count">({reviewCount.toLocaleString()})</Typography>
				</Stack>
				<Typography className="product-title" onClick={handleClick} style={{ cursor: 'pointer' }}>
					{furnitureTitle}
				</Typography>
				<Stack className="product-price-row" direction="row" alignItems="center" gap="12px">
					<Typography className="product-price">${furniturePrice.toFixed(2)}</Typography>
					{(originalPrice ?? (furnitureDiscount > 0 ? furniturePrice / (1 - furnitureDiscount / 100) : null)) && (
						<Typography className="product-price-old">
							${(originalPrice ?? furniturePrice / (1 - furnitureDiscount / 100)).toFixed(2)}
						</Typography>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default ProductCard;
