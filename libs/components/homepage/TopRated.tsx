import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TopRatedProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const TopRated = ({ furnitures, onLike }: TopRatedProps) => {
	return (
		<Stack className="top-rated-section" direction="row" justifyContent="space-between" alignItems="center">
			<Stack className="top-rated-left" gap="40px">
				<Typography className="section-title-text">
					Top Rated
					<br />
					Furniture
				</Typography>
				<Button className="btn-outline-brown" variant="outlined">
					View All
				</Button>
			</Stack>
			<Stack direction="row" gap="24px">
				{furnitures.slice(0, 3).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} size="small" />
				))}
			</Stack>
		</Stack>
	);
};

export default TopRated;
