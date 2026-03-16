import React from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface SuggestedSectionProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const SuggestedSection = ({ furnitures, onLike }: SuggestedSectionProps) => {
	return (
		<Stack className="suggested-section" gap="50px">
			<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Suggested for you</Typography>
				<Stack className="view-all-link" direction="row" alignItems="center" gap="10px">
					<Typography>View All product</Typography>
					<ArrowOutwardIcon sx={{ fontSize: 20 }} />
				</Stack>
			</Stack>
			<Stack direction="row" gap="24px">
				{furnitures.slice(0, 3).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default SuggestedSection;
