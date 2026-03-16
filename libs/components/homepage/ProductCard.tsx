import Link from 'next/link';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Furniture } from '../../types/furniture/furniture';
import { FurnitureStatus } from '../../enums/furniture.enum';
import { REACT_APP_API_URL } from '../../config';

interface ProductCardProps {
	furniture: Furniture;
	onLike?: (id: string) => void;
	size?: 'small' | 'large';
}

const ProductCard = ({ furniture, onLike, size = 'large' }: ProductCardProps) => {
	const imagePath = furniture.furnitureImages?.[0]
		? `${REACT_APP_API_URL}/${furniture.furnitureImages[0]}`
		: '/img/furniture/placeholder.png';

	const hasDiscount =
		furniture.furnitureLastChancePrice && furniture.furnitureLastChancePrice < furniture.furniturePrice;
	const discountPercent = hasDiscount
		? Math.round(((furniture.furniturePrice - furniture.furnitureLastChancePrice!) / furniture.furniturePrice) * 100)
		: 0;

	return (
		<Box className={`product-card ${size === 'small' ? 'product-card-sm' : ''}`}>
			<Box className="product-card-img">
				<Link href={`/furniture/detail?id=${furniture._id}`}>
					<img src={imagePath} alt={furniture.furnitureTitle} />
				</Link>
				{furniture.furnitureBestseller && <Box className="badge bestseller">Best seller</Box>}
				{hasDiscount && <Box className="badge discount">-{discountPercent}%</Box>}
				{furniture.furnitureStatus === FurnitureStatus.DISCONTINUED && (
					<Box className="out-of-stock-overlay">
						<Typography className="out-of-stock-text">Out of stock</Typography>
					</Box>
				)}
				<Stack className="card-actions">
					<IconButton className="action-btn" onClick={() => onLike?.(furniture._id)}>
						{furniture.likedByMe && furniture.likedByMe[0]?.myFavorite ? (
							<FavoriteIcon sx={{ color: '#a86464', fontSize: 24 }} />
						) : (
							<FavoriteBorderIcon sx={{ fontSize: 24 }} />
						)}
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
						<Typography className="rating-value">
							{furniture.furnitureRank ? (furniture.furnitureRank / 10).toFixed(1) : '4.5'}
						</Typography>
						<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
					</Box>
					<Typography className="rating-count">({furniture.furnitureViews || 0})</Typography>
				</Stack>
				<Link href={`/furniture/detail?id=${furniture._id}`}>
					<Typography className="product-title">{furniture.furnitureTitle}</Typography>
				</Link>
				<Stack className="product-price-row" direction="row" alignItems="center" gap="12px">
					<Typography className="product-price">
						${hasDiscount ? furniture.furnitureLastChancePrice?.toFixed(2) : furniture.furniturePrice.toFixed(2)}
					</Typography>
					{hasDiscount && (
						<Typography className="product-price-old">${furniture.furniturePrice.toFixed(2)}</Typography>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default ProductCard;
