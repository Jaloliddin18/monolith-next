import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface HardcodedTopSelection {
	_id: string;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureImages: string[];
	furnitureBestseller: boolean;
	furnitureDiscount: number;
	furnitureLikes: number;
	isOutOfStock?: boolean;
	rating: number;
	reviewCount: number;
	originalPrice: number;
}

const hardcodedTopSelection: HardcodedTopSelection[] = [
	{
		_id: 'topsel-1',
		furnitureTitle: 'Metal Pendant Light',
		furniturePrice: 71.20,
		furnitureImages: [],
		furnitureBestseller: true,
		furnitureDiscount: 20,
		furnitureLikes: 8924,
		rating: 4.6,
		reviewCount: 8924,
		originalPrice: 89,
	},
	{
		_id: 'topsel-2',
		furnitureTitle: 'Upholstered Ottoman Table',
		furniturePrice: 199.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 20,
		furnitureLikes: 12125,
		rating: 4.4,
		reviewCount: 12125,
		originalPrice: 249,
	},
	{
		_id: 'topsel-3',
		furnitureTitle: 'Bamboo Pendant Light',
		furniturePrice: 51.75,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 4578,
		isOutOfStock: true,
		rating: 4.4,
		reviewCount: 4578,
		originalPrice: 69,
	},
	{
		_id: 'topsel-4',
		furnitureTitle: 'Luxurious Velvet Chair',
		furniturePrice: 299.99,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 12125,
		rating: 4.4,
		reviewCount: 12125,
		originalPrice: 345.66,
	},
	{
		_id: 'topsel-5',
		furnitureTitle: 'Entryway Console Table',
		furniturePrice: 144.49,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 9908,
		rating: 4.6,
		reviewCount: 9908,
		originalPrice: 169.99,
	},
	{
		_id: 'topsel-6',
		furnitureTitle: 'Tufted Accent Chair',
		furniturePrice: 299,
		furnitureImages: [],
		furnitureBestseller: true,
		furnitureDiscount: 0,
		furnitureLikes: 12125,
		rating: 4.4,
		reviewCount: 12125,
		originalPrice: 239.20,
	},
];

interface TopSelectionProps {
	furnitures?: Furniture[];
	onLike?: (id: string) => void;
}

const TopSelection = ({ furnitures, onLike }: TopSelectionProps) => {
	const [page, setPage] = useState(1);
	const products = furnitures && furnitures.length > 0 ? furnitures : null;

	return (
		<Stack className="top-selection-section" alignItems="center" gap="50px">
			<Stack className="top-selection-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Top selection</Typography>
				<Stack direction="row" gap="14px" alignItems="center">
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text active">Sort by</Typography>
						<Box component="img" src="/icons/CaretDown.svg" alt="▾" width={14} height={14} />
					</Stack>
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text">Categories</Typography>
						<Box component="img" src="/icons/CaretDown.svg" alt="▾" width={14} height={14} sx={{ opacity: 0.4 }} />
					</Stack>
					<Stack className="filter-dropdown" direction="row" alignItems="center" gap="12px">
						<Typography className="filter-text">Color</Typography>
						<Box component="img" src="/icons/CaretDown.svg" alt="▾" width={14} height={14} sx={{ opacity: 0.4 }} />
					</Stack>
				</Stack>
			</Stack>

			<Stack direction="row" flexWrap="wrap" gap="40px 28px" sx={{ width: 1200 }}>
				{products
					? products.slice(0, 6).map((furniture) => (
							<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
						))
					: hardcodedTopSelection.map((item) => (
							<ProductCard
								key={item._id}
								furniture={item as unknown as Furniture}
								isOutOfStock={item.isOutOfStock}
								rating={item.rating}
								reviewCount={item.reviewCount}
								originalPrice={item.originalPrice}
								onLike={onLike}
							/>
						))}
			</Stack>

			<Stack className="top-selection-pagination" direction="row" alignItems="center" gap="24px">
				<Stack
					className="pagination-nav prev"
					direction="row"
					alignItems="center"
					gap="10px"
					sx={{ cursor: 'pointer' }}
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
					count={10}
					page={page}
					onChange={(_, val) => setPage(val)}
					variant="outlined"
					shape="circular"
					className="custom-pagination"
				/>
				<Stack
					className="pagination-nav next"
					direction="row"
					alignItems="center"
					gap="10px"
					sx={{ cursor: 'pointer', color: '#bfbfbf' }}
				>
					<Typography className="pagination-text">NEXT</Typography>
					<Box component="img" src="/icons/ArrowRight.svg" alt="→" width={24} height={24} sx={{ opacity: 0.4 }} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TopSelection;
