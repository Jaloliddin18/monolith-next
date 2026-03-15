import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../config';

interface ProductCardProps {
	furniture: Furniture;
	onLike?: (id: string) => void;
}

const ProductCard = ({ furniture, onLike }: ProductCardProps) => {
	const isLiked = furniture.meLiked?.[0]?.myFavorite ?? false;
	const imagePath = furniture.furnitureImages?.[0]
		? `${REACT_APP_API_URL}/${furniture.furnitureImages[0]}`
		: '/img/furniture/placeholder.png';

	const hasDiscount = furniture.furnitureClearancePrice && furniture.furnitureClearancePrice < furniture.furniturePrice;
	const discountPercent = hasDiscount
		? Math.round(((furniture.furniturePrice - furniture.furnitureClearancePrice!) / furniture.furniturePrice) * 100)
		: 0;

	return (
		<Box className="product-card">
			<Box className="product-card-img">
				<Link href={`/furniture/detail?id=${furniture._id}`}>
					<img src={imagePath} alt={furniture.furnitureTitle} />
				</Link>
				{hasDiscount && (
					<Box className="badge discount">-{discountPercent}%</Box>
				)}
				{furniture.furnitureRank >= 5 && (
					<Box className="badge bestseller">Best seller</Box>
				)}
				<IconButton className="like-btn" onClick={() => onLike?.(furniture._id)}>
					{isLiked ? <FavoriteIcon sx={{ color: '#a0616a' }} /> : <FavoriteBorderIcon />}
				</IconButton>
			</Box>
			<Box className="product-card-info">
				<Link href={`/furniture/detail?id=${furniture._id}`}>
					<Typography variant="body2" className="product-title">
						{furniture.furnitureTitle}
					</Typography>
				</Link>
				<Stack direction="row" alignItems="center" gap={1}>
					<Typography variant="body1" fontWeight={600} className="product-price">
						${hasDiscount ? furniture.furnitureClearancePrice?.toFixed(2) : furniture.furniturePrice.toFixed(2)}
					</Typography>
					{hasDiscount && (
						<Typography variant="body2" className="product-price-old">
							${furniture.furniturePrice.toFixed(2)}
						</Typography>
					)}
				</Stack>
			</Box>
		</Box>
	);
};

export default ProductCard;
