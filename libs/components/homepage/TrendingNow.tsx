import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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
	isOutOfStock: boolean;
	rating: number;
	reviewCount: number;
	originalPrice?: number;
}

const hardcodedProducts: HardcodedProduct[] = [
	{
		_id: 'trending-1',
		furnitureTitle: 'Upholstered Armchair',
		furniturePrice: 279.20,
		furnitureImages: [],
		furnitureBestseller: true,
		furnitureDiscount: 0,
		furnitureLikes: 215,
		isOutOfStock: false,
		rating: 4.5,
		reviewCount: 215,
		originalPrice: 349,
	},
	{
		_id: 'trending-2',
		furnitureTitle: 'Wooden Showpiece Table',
		furniturePrice: 32.10,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 12125,
		isOutOfStock: false,
		rating: 4.4,
		reviewCount: 12125,
		originalPrice: 68.35,
	},
	{
		_id: 'trending-3',
		furnitureTitle: 'Leather Reclining',
		furniturePrice: 799.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 1587,
		isOutOfStock: true,
		rating: 4.6,
		reviewCount: 1587,
		originalPrice: 999,
	},
	{
		_id: 'trending-4',
		furnitureTitle: 'Rustic Wooden Chair',
		furniturePrice: 89.99,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 12125,
		isOutOfStock: false,
		rating: 4.2,
		reviewCount: 12125,
	},
	{
		_id: 'trending-5',
		furnitureTitle: 'Wooden Ceiling Lamp',
		furniturePrice: 47.20,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 20,
		furnitureLikes: 165,
		isOutOfStock: false,
		rating: 4.3,
		reviewCount: 165,
		originalPrice: 59,
	},
	{
		_id: 'trending-6',
		furnitureTitle: 'Adjustable Standing Desk',
		furniturePrice: 159.99,
		furnitureImages: [],
		furnitureBestseller: false,
		furnitureDiscount: 0,
		furnitureLikes: 8068,
		isOutOfStock: false,
		rating: 4.8,
		reviewCount: 8068,
	},
];

interface TrendingNowProps {
	trendFurnitures?: Furniture[];
	onLike?: (id: string) => void;
}

const TrendingNow = ({ trendFurnitures, onLike }: TrendingNowProps) => {
	const router = useRouter();
	const products = trendFurnitures && trendFurnitures.length > 0 ? trendFurnitures : null;

	return (
		<Stack className="trending-section" gap="50px">
			<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Trending Now</Typography>
				<Stack className="view-all-link" direction="row" alignItems="center" gap="10px" onClick={() => router.push('/furniture')} sx={{ cursor: 'pointer' }}>
					<Typography>View All product</Typography>
					<Box component="img" src="/icons/ArrowUpRight.svg" alt="→" width={20} height={20} />
				</Stack>
			</Stack>
			<Box className="section-swiper-wrap">
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView={4}
					spaceBetween={24}
					loop={true}
					navigation={true}
					pagination={{ clickable: true }}
					style={{ width: '100%', paddingBottom: '48px' }}
				>
					{products
						? products.slice(0, 6).map((furniture) => (
								<SwiperSlide key={furniture._id}>
									<ProductCard furniture={furniture} onLike={onLike} />
								</SwiperSlide>
							))
						: hardcodedProducts.map((item) => (
								<SwiperSlide key={item._id}>
									<ProductCard
										furniture={item as unknown as Furniture}
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

export default TrendingNow;
