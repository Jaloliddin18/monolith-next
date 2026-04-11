import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../common/ProductCard';

interface SaleBannerProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const getTimeLeft = (target: Date) => {
	const diff = Math.max(0, target.getTime() - Date.now());
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		mins: Math.floor((diff / (1000 * 60)) % 60),
		secs: Math.floor((diff / 1000) % 60),
	};
};

const SaleBanner = ({ furnitures, onLike }: SaleBannerProps) => {
	const countdownTarget = useMemo(() => {
		const ends = furnitures
			.filter((f) => f.discountEnd)
			.map((f) => new Date(f.discountEnd!).getTime());
		if (!ends.length) return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
		return new Date(Math.min(...ends));
	}, [furnitures]);

	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(countdownTarget));

	useEffect(() => {
		setTimeLeft(getTimeLeft(countdownTarget));
		const timer = setInterval(() => setTimeLeft(getTimeLeft(countdownTarget)), 1000);
		return () => clearInterval(timer);
	}, [countdownTarget]);

	const pad = (n: number) => n.toString().padStart(2, '0');

	if (!furnitures.length) return null;

	return (
		<Stack className="sale-banner-section" gap="40px">
			<Stack className="sale-header" gap="16px">
				{/* Row 1: title + subtitle left | arrows + dots right */}
				<Box className="sale-info-box">
					<Box className="left">
						<span>
							<em>Sale</em> Opportunity — Don&apos;t Miss Out!
						</span>
						<p>Limited time deals on premium furniture</p>
					</Box>
					<Box className="right">
						<Box className="pagination-box">
							<WestIcon className="swiper-sale-prev" />
							<div className="swiper-sale-pagination" />
							<EastIcon className="swiper-sale-next" />
						</Box>
					</Box>
				</Box>

				{/* Row 2: countdown centered */}
				<Stack className="countdown-wrapper" gap="4px" alignItems="center">
					<Stack className="countdown-row" direction="row" alignItems="center" gap="14px">
						{[
							{ value: pad(timeLeft.days), label: 'Days' },
							{ value: pad(timeLeft.hours), label: 'Hours' },
							{ value: pad(timeLeft.mins), label: 'Mins' },
							{ value: pad(timeLeft.secs), label: 'Secs' },
						].map((item, i) => (
							<React.Fragment key={item.label}>
								<Box className="countdown-circle">
									<Typography className="countdown-value">{item.value}</Typography>
								</Box>
								{i < 3 && <Typography className="countdown-colon">:</Typography>}
							</React.Fragment>
						))}
					</Stack>
					<Stack className="countdown-labels" direction="row" gap="32px">
						{['Days', 'Hours', 'Mins', 'Secs'].map((label) => (
							<Typography key={label} className="countdown-label">
								{label}
							</Typography>
						))}
					</Stack>
				</Stack>
			</Stack>

			<Swiper
				modules={[Navigation, Pagination]}
				slidesPerView={'auto'}
				slidesPerGroup={4}
				spaceBetween={24}
				watchOverflow={false}
				navigation={{
					nextEl: '.swiper-sale-next',
					prevEl: '.swiper-sale-prev',
				}}
				pagination={{ el: '.swiper-sale-pagination', clickable: true, type: 'bullets' }}
			>
				{furnitures.map((furniture) => (
					<SwiperSlide key={furniture._id} style={{ width: 'auto' }}>
						<ProductCard furniture={furniture} onLike={onLike} />
					</SwiperSlide>
				))}
			</Swiper>
		</Stack>
	);
};

export default SaleBanner;
