import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TrendingNowProps {
	trendFurnitures: Furniture[];
	onLike: (id: string) => void;
}

const TrendingNow = ({ trendFurnitures, onLike }: TrendingNowProps) => {
	return (
		<Stack className="trending-section">
			<Stack direction="row" justifyContent="space-between" alignItems="center" className="section-header">
				<Box>
					<Typography variant="h5" color="primary">
						Trendsetting Designs
					</Typography>
					<Typography className="section-title" variant="h2">
						Upgrade Your Seating Game
					</Typography>
				</Box>
				<Button variant="outlined" className="btn-view-all">
					Trending Now
				</Button>
			</Stack>

			<Stack direction="row" className="product-grid" gap={3}>
				{trendFurnitures.map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default TrendingNow;
