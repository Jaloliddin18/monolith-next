import React from 'react';
import { Box, Stack } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
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
				<Box className="right">
					<Box className="pagination-box">
						<WestIcon className="swiper-top-rated-prev" />
						<div className="swiper-top-rated-pagination" />
						<EastIcon className="swiper-top-rated-next" />
					</Box>
				</Box>
			</Box>

			<Box className="top-rated-swiper-wrapper">
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView={'auto'}
					spaceBetween={24}
					navigation={{
						nextEl: '.swiper-top-rated-next',
						prevEl: '.swiper-top-rated-prev',
					}}
					pagination={{ el: '.swiper-top-rated-pagination', clickable: true }}
				>
					{furnitures.map((furniture) => (
						<SwiperSlide key={furniture._id} style={{ width: 'auto' }}>
							<ProductCard furniture={furniture} size="small" onLike={onLike} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Stack>
	);
};

export default TopRated;
