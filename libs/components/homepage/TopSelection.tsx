import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
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
	const products = furnitures && furnitures.length > 0 ? furnitures : null;

	return (
		<Stack className="top-selection-section" alignItems="center" gap="50px">
			<Stack className="top-selection-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Top selection</Typography>
				<Stack direction="row" gap="14px" alignItems="center">
					<WestIcon className="swiper-top-selection-prev" sx={{ cursor: 'pointer', fontSize: 24 }} />
					<EastIcon className="swiper-top-selection-next" sx={{ cursor: 'pointer', fontSize: 24 }} />
				</Stack>
			</Stack>

			<Box sx={{ width: '100%' }}>
				<Swiper
					modules={[Navigation]}
					slidesPerView={4}
					spaceBetween={28}
					navigation={{
						nextEl: '.swiper-top-selection-next',
						prevEl: '.swiper-top-selection-prev',
					}}
					breakpoints={{
						0: { slidesPerView: 1 },
						600: { slidesPerView: 2 },
						900: { slidesPerView: 3 },
						1200: { slidesPerView: 4 },
					}}
				>
					{(products ?? (hardcodedTopSelection as unknown as Furniture[])).map((item: any) => (
						<SwiperSlide key={item._id}>
							<ProductCard
								furniture={item}
								isOutOfStock={item.isOutOfStock}
								rating={item.rating}
								reviewCount={item.reviewCount}
								originalPrice={item.originalPrice}
								onLike={onLike}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Stack>
	);
};

export default TopSelection;
