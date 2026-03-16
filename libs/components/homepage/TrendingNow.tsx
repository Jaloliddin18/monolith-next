import React from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TrendingNowProps {
	trendFurnitures: Furniture[];
	onLike: (id: string) => void;
}

const TrendingNow = ({ trendFurnitures, onLike }: TrendingNowProps) => {
	return (
		<Stack className="trending-section" gap="50px">
			<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Trending Now</Typography>
				<Stack className="view-all-link" direction="row" alignItems="center" gap="10px">
					<Typography>View All product</Typography>
					<ArrowOutwardIcon sx={{ fontSize: 20 }} />
				</Stack>
			</Stack>
			<Stack direction="row" flexWrap="wrap" gap="24px">
				{trendFurnitures.slice(0, 6).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default TrendingNow;
