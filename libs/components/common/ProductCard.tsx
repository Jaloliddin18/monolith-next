import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface ProductCardProps {
	id: string;
	image: string;
	title: string;
	price: number;
	originalPrice?: number;
	discount?: number;
	rating?: number;
	reviewCount?: number;
	isBestseller?: boolean;
	onLike?: (id: string) => void;
}

const ProductCard = ({
	id,
	image,
	title,
	price,
	originalPrice,
	discount,
	rating = 4.4,
	reviewCount = 12125,
	isBestseller,
	onLike,
}: ProductCardProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/furniture/detail?id=${id}`);
	};

	return (
		<Box className="product-card product-card-sm">
			<Box className="product-card-img" onClick={handleClick} style={{ cursor: 'pointer' }}>
				<img src={image} alt={title} />
				{isBestseller && <Box className="badge bestseller">Best seller</Box>}
				{discount && <Box className="badge discount">-{discount}%</Box>}
				<Stack className="card-actions">
					<IconButton
						className="action-btn"
						onClick={(e) => {
							e.stopPropagation();
							onLike?.(id);
						}}
					>
						<FavoriteBorderIcon sx={{ fontSize: 24 }} />
					</IconButton>
					<IconButton className="action-btn">
						<VisibilityOutlinedIcon sx={{ fontSize: 24 }} />
					</IconButton>
					<IconButton className="action-btn">
						<OpenInFullIcon sx={{ fontSize: 24 }} />
					</IconButton>
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
					{title}
				</Typography>
				<Stack className="product-price-row" direction="row" alignItems="center" gap="12px">
					<Typography className="product-price">${price.toFixed(2)}</Typography>
					{originalPrice && <Typography className="product-price-old">${originalPrice.toFixed(2)} USD</Typography>}
				</Stack>
			</Stack>
		</Box>
	);
};

export default ProductCard;
