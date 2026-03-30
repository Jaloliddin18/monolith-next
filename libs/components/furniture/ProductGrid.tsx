import React from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductCard from '../common/ProductCard';

const hardcodedProducts = [
	{ id: '1', title: 'Wooden Showpice Table', price: 32.10, originalPrice: 68.35, discount: 30, rating: 4.4, reviewCount: 12125 },
	{ id: '2', title: 'Modern Lounge Chair', price: 45.00, originalPrice: 90.00, discount: 50, rating: 4.2, reviewCount: 8340 },
	{ id: '3', title: 'Elegant Side Table', price: 28.50, originalPrice: 57.00, discount: 50, rating: 4.6, reviewCount: 5210 },
	{ id: '4', title: 'Rustic Coffee Table', price: 55.20, originalPrice: 78.85, discount: 30, rating: 4.3, reviewCount: 9870 },
	{ id: '5', title: 'Minimalist Desk Lamp', price: 19.99, originalPrice: 39.99, discount: 50, rating: 4.8, reviewCount: 15400 },
	{ id: '6', title: 'Velvet Accent Chair', price: 72.00, originalPrice: 120.00, discount: 40, rating: 4.1, reviewCount: 6780 },
	{ id: '7', title: 'Bamboo Plant Stand', price: 24.30, originalPrice: 48.60, discount: 50, rating: 4.5, reviewCount: 3290 },
	{ id: '8', title: 'Industrial Bookshelf', price: 89.90, originalPrice: 149.90, discount: 40, rating: 4.7, reviewCount: 11050 },
	{ id: '9', title: 'Ceramic Table Vase', price: 15.75, originalPrice: 31.50, discount: 50, rating: 4.0, reviewCount: 4560 },
];

interface ProductGridProps {
	total?: number;
	page?: number;
	limit?: number;
	sortValue?: string;
	onPageChange?: (page: number) => void;
	onSortChange?: (sort: string) => void;
	onLike?: (id: string) => void;
}

const ProductGrid = ({ total = 9, page = 1, limit = 9, onPageChange, onLike }: ProductGridProps) => {
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

			<Stack className="grid-cards" direction="row" flexWrap="wrap">
				{hardcodedProducts.map((product) => (
					<Box key={product.id} className="grid-card-wrapper">
						<ProductCard
							id={product.id}
							image="/img/furniture/luxury_chair.jpg"
							title={product.title}
							price={product.price}
							originalPrice={product.originalPrice}
							discount={product.discount}
							rating={product.rating}
							reviewCount={product.reviewCount}
							onLike={onLike}
						/>
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
						onClick={() => page > 1 && onPageChange?.(page - 1)}
					>
						<ArrowBackIcon sx={{ fontSize: 24 }} />
						<Typography className="pagination-text">PREV</Typography>
					</Stack>
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, val) => onPageChange?.(val)}
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
						onClick={() => page < totalPages && onPageChange?.(page + 1)}
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
