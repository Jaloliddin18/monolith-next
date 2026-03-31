import React from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface HardcodedProduct {
	_id: string;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureImages: string[];
	furnitureBestseller: boolean;
	furnitureDiscount: number;
	furnitureLikes: number;
	rating: number;
	reviewCount: number;
	originalPrice: number;
}

const hardcodedProducts: HardcodedProduct[] = [
	{ _id: 'grid-1', furnitureTitle: 'Wooden Showpiece Table', furniturePrice: 32.10, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 30, furnitureLikes: 12125, rating: 4.4, reviewCount: 12125, originalPrice: 68.35 },
	{ _id: 'grid-2', furnitureTitle: 'Modern Lounge Chair', furniturePrice: 45.00, furnitureImages: [], furnitureBestseller: true, furnitureDiscount: 50, furnitureLikes: 8340, rating: 4.2, reviewCount: 8340, originalPrice: 90.00 },
	{ _id: 'grid-3', furnitureTitle: 'Elegant Side Table', furniturePrice: 28.50, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 50, furnitureLikes: 5210, rating: 4.6, reviewCount: 5210, originalPrice: 57.00 },
	{ _id: 'grid-4', furnitureTitle: 'Rustic Coffee Table', furniturePrice: 55.20, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 30, furnitureLikes: 9870, rating: 4.3, reviewCount: 9870, originalPrice: 78.85 },
	{ _id: 'grid-5', furnitureTitle: 'Minimalist Desk Lamp', furniturePrice: 19.99, furnitureImages: [], furnitureBestseller: true, furnitureDiscount: 50, furnitureLikes: 15400, rating: 4.8, reviewCount: 15400, originalPrice: 39.99 },
	{ _id: 'grid-6', furnitureTitle: 'Velvet Accent Chair', furniturePrice: 72.00, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 40, furnitureLikes: 6780, rating: 4.1, reviewCount: 6780, originalPrice: 120.00 },
	{ _id: 'grid-7', furnitureTitle: 'Bamboo Plant Stand', furniturePrice: 24.30, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 50, furnitureLikes: 3290, rating: 4.5, reviewCount: 3290, originalPrice: 48.60 },
	{ _id: 'grid-8', furnitureTitle: 'Industrial Bookshelf', furniturePrice: 89.90, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 40, furnitureLikes: 11050, rating: 4.7, reviewCount: 11050, originalPrice: 149.90 },
	{ _id: 'grid-9', furnitureTitle: 'Ceramic Table Vase', furniturePrice: 15.75, furnitureImages: [], furnitureBestseller: false, furnitureDiscount: 50, furnitureLikes: 4560, rating: 4.0, reviewCount: 4560, originalPrice: 31.50 },
];

interface ProductGridProps {
	furnitures?: Furniture[];
	total?: number;
	page?: number;
	limit?: number;
	sortValue?: string;
	onPageChange?: (page: number) => void;
	onSortChange?: (sort: string) => void;
	onLike?: (id: string) => void;
}

const ProductGrid = ({ furnitures, total = 9, page = 1, limit = 9, onPageChange, onLike }: ProductGridProps) => {
	const products = furnitures && furnitures.length > 0 ? furnitures : null;
	const displayTotal = products ? total : hardcodedProducts.length;
	const totalPages = Math.ceil(displayTotal / limit);
	const startItem = (page - 1) * limit + 1;
	const endItem = Math.min(page * limit, displayTotal);

	return (
		<Stack className="product-grid-area">
			<Stack className="grid-top-bar" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="grid-result-count">
					{displayTotal > 0 ? `${startItem}-${endItem} of ${displayTotal} products` : 'No products found'}
				</Typography>
			</Stack>

			<Stack className="grid-cards" direction="row" flexWrap="wrap">
				{products
					? products.map((furniture) => (
							<Box key={furniture._id} className="grid-card-wrapper">
								<ProductCard furniture={furniture} onLike={onLike} />
							</Box>
						))
					: hardcodedProducts.map((product) => (
							<Box key={product._id} className="grid-card-wrapper">
								<ProductCard
									furniture={product as unknown as Furniture}
									rating={product.rating}
									reviewCount={product.reviewCount}
									originalPrice={product.originalPrice}
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
						<Box
							component="img"
							src="/icons/ArrowRight.svg"
							alt="←"
							width={24}
							height={24}
							sx={{ transform: 'rotate(180deg)' }}
						/>
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
						<Box
							component="img"
							src="/icons/ArrowRight.svg"
							alt="→"
							width={24}
							height={24}
						/>
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

export default ProductGrid;
