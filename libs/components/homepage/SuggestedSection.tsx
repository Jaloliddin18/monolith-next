import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface SuggestedSectionProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const SuggestedSection = ({ furnitures, onLike }: SuggestedSectionProps) => {
	return (
		<Stack className="suggested-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Suggested for you
			</Typography>

			<Stack direction="row" className="product-grid" gap={3} justifyContent="center">
				{furnitures.slice(0, 3).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default SuggestedSection;
