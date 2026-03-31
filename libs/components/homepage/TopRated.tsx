import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface HardcodedTopRated {
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

const hardcodedTopRated: HardcodedTopRated[] = [
	{
		_id: 'toprated-1',
		furnitureTitle: 'Wooden Bedside Table',
		furniturePrice: 143.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 5279,
		rating: 4.5,
		reviewCount: 5279,
		originalPrice: 179,
	},
	{
		_id: 'toprated-2',
		furnitureTitle: 'Moroccan Style Hanging',
		furniturePrice: 66.75,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 1056,
		rating: 4.8,
		reviewCount: 1056,
		originalPrice: 89,
	},
	{
		_id: 'toprated-3',
		furnitureTitle: 'Nesting Side Tables',
		furniturePrice: 199.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 5795,
		rating: 4.7,
		reviewCount: 5795,
		originalPrice: 249,
	},
];

interface TopRatedProps {
	furnitures?: Furniture[];
	onLike?: (id: string) => void;
}

const TopRated = ({ furnitures, onLike }: TopRatedProps) => {
	const products = furnitures && furnitures.length > 0 ? furnitures : null;

	return (
		<Stack className="top-rated-section" direction="row" justifyContent="space-between" alignItems="center">
			<Stack className="top-rated-left" gap="40px">
				<Typography className="section-title-text">
					Top Rated
					<br />
					Furniture
				</Typography>
				<Button className="btn-outline-brown" disableElevation>
					View All
				</Button>
			</Stack>
			<Stack direction="row" gap="24px">
				{products
					? products.slice(0, 3).map((furniture) => (
							<ProductCard key={furniture._id} furniture={furniture} size="small" onLike={onLike} />
						))
					: hardcodedTopRated.map((item) => (
							<ProductCard
								key={item._id}
								furniture={item as unknown as Furniture}
								rating={item.rating}
								reviewCount={item.reviewCount}
								originalPrice={item.originalPrice}
								size="small"
								onLike={onLike}
							/>
						))}
			</Stack>
		</Stack>
	);
};

export default TopRated;
