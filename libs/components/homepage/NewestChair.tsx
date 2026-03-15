import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface NewestChairProps {
	newFurnitures: Furniture[];
	onLike: (id: string) => void;
}

const NewestChair = ({ newFurnitures, onLike }: NewestChairProps) => {
	return (
		<Stack className="newest-section">
			<Stack direction="row" justifyContent="space-between" alignItems="center" className="section-header">
				<Box>
					<Typography variant="h5" color="primary">
						Newest Chair
					</Typography>
					<Typography className="section-title" variant="h2">
						Freshen Up Your Seating
					</Typography>
				</Box>
				<Button variant="outlined" className="btn-view-all">
					New arrivals
				</Button>
			</Stack>

			<Stack direction="row" className="product-grid" gap={3}>
				{newFurnitures.map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default NewestChair;
