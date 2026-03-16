import React from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../homepage/ProductCard';

interface ProductGridProps {
	furnitures: Furniture[];
	total: number;
	page: number;
	limit: number;
	sortValue: string;
	onPageChange: (page: number) => void;
	onSortChange: (sort: string) => void;
	onLike: (id: string) => void;
}

const ProductGrid = ({ furnitures, total, page, limit, onPageChange, onLike }: ProductGridProps) => {
	const totalPages = Math.ceil(total / limit);
	const startItem = (page - 1) * limit + 1;
	const endItem = Math.min(page * limit, total);

	return (
		<Stack className="product-grid-area">
			<Stack className="grid-top-bar" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="grid-result-count">
					{total > 0 ? `${startItem}-${endItem} of ${total} products` : 'No products found'}
				</Typography>
			</Stack>

			<Stack className="grid-cards" direction="row" flexWrap="wrap" gap="24px 24px">
				{furnitures.map((furniture) => (
					<Box key={furniture._id} className="grid-card-wrapper">
						<ProductCard furniture={furniture} onLike={onLike} size="small" />
					</Box>
				))}
			</Stack>

			{totalPages > 1 && (
				<Stack className="grid-pagination" direction="row" alignItems="center" justifyContent="center" gap="24px">
					<Stack
						direction="row"
						alignItems="center"
						gap="10px"
						sx={{ cursor: page > 1 ? 'pointer' : 'default', opacity: page > 1 ? 1 : 0.4 }}
						onClick={() => page > 1 && onPageChange(page - 1)}
					>
						<ArrowBackIcon sx={{ fontSize: 24 }} />
						<Typography className="pagination-text">PREV</Typography>
					</Stack>
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, val) => onPageChange(val)}
						variant="outlined"
						shape="circular"
						className="custom-pagination"
						hidePrevButton
						hideNextButton
					/>
					<Stack
						direction="row"
						alignItems="center"
						gap="12px"
						sx={{ cursor: page < totalPages ? 'pointer' : 'default', opacity: page < totalPages ? 1 : 0.4 }}
						onClick={() => page < totalPages && onPageChange(page + 1)}
					>
						<Typography className="pagination-text">NEXT</Typography>
						<ArrowForwardIcon sx={{ fontSize: 24 }} />
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

export default ProductGrid;
