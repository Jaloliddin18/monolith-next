import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface TopSelectionProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const TopSelection = ({ furnitures, onLike }: TopSelectionProps) => {
	const [page, setPage] = useState(1);

	return (
		<Stack className="top-selection-section" alignItems="center" gap="50px">
			<Stack className="top-selection-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Top selection</Typography>
				<Stack direction="row" gap="14px" alignItems="center">
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text active">Sort by</Typography>
						<KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#000' }} />
					</Stack>
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text">Categories</Typography>
						<KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#999' }} />
					</Stack>
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text">Color</Typography>
						<KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#999' }} />
					</Stack>
				</Stack>
			</Stack>

			<Stack direction="row" flexWrap="wrap" gap="24px 24px" sx={{ width: 1140 }}>
				{furnitures.slice(0, 6).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>

			<Stack direction="row" alignItems="center" gap="24px">
				<Stack direction="row" alignItems="center" gap="10px" sx={{ cursor: 'pointer' }}>
					<ArrowBackIcon sx={{ fontSize: 24 }} />
					<Typography className="pagination-text">PREV</Typography>
				</Stack>
				<Pagination
					count={10}
					page={page}
					onChange={(_, val) => setPage(val)}
					variant="outlined"
					shape="circular"
					className="custom-pagination"
				/>
				<Stack direction="row" alignItems="center" gap="12px" sx={{ cursor: 'pointer', color: '#bfbfbf' }}>
					<Typography className="pagination-text">NEXT</Typography>
					<ArrowForwardIcon sx={{ fontSize: 24 }} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TopSelection;
