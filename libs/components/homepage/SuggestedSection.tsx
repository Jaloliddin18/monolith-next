import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface HardcodedSuggested {
	_id: string;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureImages: string[];
	furnitureBestseller: boolean;
	furnitureDiscount: number;
	furnitureLikes: number;
	isOutOfStock: boolean;
	rating: number;
	reviewCount: number;
	originalPrice: number;
}

const hardcodedSuggested: HardcodedSuggested[] = [
	{
		_id: 'suggested-1',
		furnitureTitle: 'Velvet Club Chair',
		furniturePrice: 279.20,
		furnitureImages: [],
		furnitureBestseller: true,
		furnitureDiscount: 0,
		furnitureLikes: 5482,
		isOutOfStock: false,
		rating: 4.8,
		reviewCount: 5482,
		originalPrice: 349,
	},
	{
		_id: 'suggested-2',
		furnitureTitle: 'Wooden Bedside Table',
		furniturePrice: 103.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 20,
		furnitureLikes: 2546,
		isOutOfStock: false,
		rating: 4.2,
		reviewCount: 2546,
		originalPrice: 129,
	},
	{
		_id: 'suggested-3',
		furnitureTitle: 'Modern Swivel Chair',
		furniturePrice: 1279.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 12125,
		isOutOfStock: true,
		rating: 4.4,
		reviewCount: 12125,
		originalPrice: 1599,
	},
];

interface SuggestedSectionProps {
	furnitures?: Furniture[];
	onLike?: (id: string) => void;
}

const SuggestedSection = ({ furnitures, onLike }: SuggestedSectionProps) => {
	const router = useRouter();
	const products = furnitures && furnitures.length > 0 ? furnitures : null;

	return (
		<Stack className="suggested-section" gap="50px">
			<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Suggested for you</Typography>
				<Stack className="view-all-link" direction="row" alignItems="center" gap="10px" onClick={() => router.push('/furniture')} sx={{ cursor: 'pointer' }}>
					<Typography>View All product</Typography>
					<Box component="img" src="/icons/ArrowUpRight.svg" alt="→" width={20} height={20} />
				</Stack>
			</Stack>
			<Stack direction="row" gap="24px">
				{products
					? products.slice(0, 3).map((furniture) => (
							<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
						))
					: hardcodedSuggested.map((item) => (
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
		</Stack>
	);
};

export default SuggestedSection;
