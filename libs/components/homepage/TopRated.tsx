import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TopRatedProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const TopRated = ({ furnitures, onLike }: TopRatedProps) => {
	return (
		<Stack className="top-rated-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Top Rated Furniture
			</Typography>

			<Stack direction="row" className="product-grid" gap={3} justifyContent="center">
				{furnitures.slice(0, 3).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default TopRated;
