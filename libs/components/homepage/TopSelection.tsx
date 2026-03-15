import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TopSelectionProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const TopSelection = ({ furnitures, onLike }: TopSelectionProps) => {
	return (
		<Stack className="top-selection-section">
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
				<Typography className="section-title" variant="h2">
					Top selection
				</Typography>
				<Stack direction="row" gap={1}>
					<IconButton className="nav-btn">
						<ArrowBackIosNewIcon fontSize="small" />
					</IconButton>
					<IconButton className="nav-btn">
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>
				</Stack>
			</Stack>

			<Stack direction="row" className="product-grid" gap={3}>
				{furnitures.slice(0, 4).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default TopSelection;
