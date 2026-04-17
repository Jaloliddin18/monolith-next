import React from 'react';
import { Box, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface TopRatedProps {
	furnitures?: Furniture[];
	onLike?: (id: string) => void;
}

const TopRated = ({ furnitures = [], onLike }: TopRatedProps) => {
	if (!furnitures.length) return null;

	return (
		<Stack className="top-rated-section" gap="40px">
			<Box className="info-box">
				<Box className="left">
					<span>Top Rated Furniture</span>
					<p>Check out our top rated items</p>
				</Box>
			</Box>

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
					{furnitures.map((furniture) => (
						<SwiperSlide key={furniture._id}>
							<ProductCard furniture={furniture} size="small" onLike={onLike} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Stack>
	);
};

export default TopRated;
