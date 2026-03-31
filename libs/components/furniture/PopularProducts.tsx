import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';

const popularItems = [
	{ id: 'pop-1', title: 'Perfect Bed for a Restorative', price: 40.5, originalPrice: 20.1, badge: 'bestseller' as const },
	{ id: 'pop-2', title: 'Perfect Bed for a Restorative', price: 40.5, originalPrice: 20.1, badge: null },
	{ id: 'pop-3', title: 'Perfect Bed for a Restorative', price: 40.5, originalPrice: 20.1, badge: null },
	{ id: 'pop-4', title: 'Perfect Bed for a Restorative', price: 40.5, originalPrice: 20.1, badge: null },
];

const PopularProducts = () => {
	return (
		<Stack className="popular-products-section">
			{/* Header */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" className="popular-products-header">
				<Typography className="popular-products-title">Popular product</Typography>
				<Link href="/furniture" style={{ textDecoration: 'none' }}>
					<Stack direction="row" alignItems="center" gap="10px" className="popular-view-all">
						<Typography className="popular-view-all-text">View All product</Typography>
						<Box component="img" src="/icons/ArrowUpRight.svg" alt="↗" width={20} height={20} />
					</Stack>
				</Link>
			</Stack>

			{/* Content row */}
			<Stack direction="row" gap="24px" className="popular-products-content">
				{/* Left: featured large card */}
				<Box className="popular-featured-card">
					<img src="/img/furniture/luxury_chair.jpg" alt="Featured" className="popular-featured-img" />

					{/* Hotspot dots */}
					<Box className="popular-hotspot" sx={{ left: '381px', top: '329px' }} />
					<Box className="popular-hotspot" sx={{ left: '124px', top: '329px' }} />
					<Box className="popular-hotspot" sx={{ left: '454px', top: '483px' }} />

					{/* Info popup */}
					<Stack className="popular-featured-popup" gap="24px" alignItems="center">
						<Stack gap="12px" alignItems="center">
							<Typography className="popular-featured-name">Lounge Chair</Typography>
							<Typography className="popular-featured-price">$ 32.10</Typography>
						</Stack>
						<Box className="popular-buy-btn">
							<Typography className="popular-buy-btn-text">BUY NOW</Typography>
						</Box>
					</Stack>
				</Box>

				{/* Right: 2×2 grid */}
				<Stack direction="row" flexWrap="wrap" gap="24px" className="popular-grid">
					{popularItems.map((item) => (
						<Stack key={item.id} className="popular-grid-card" gap="14px">
							<Box className="popular-grid-img">
								{item.badge === 'bestseller' && (
									<Box className="popular-grid-badge bestseller">Best seller</Box>
								)}
								<img src="/img/furniture/luxury_chair.jpg" alt={item.title} />
							</Box>
							<Stack gap="4px">
								<Typography className="popular-grid-title">{item.title}</Typography>
								<Stack direction="row" alignItems="center" gap="8px">
									<Typography className="popular-grid-price">${item.price.toFixed(2)}</Typography>
									<Typography className="popular-grid-price-old">${item.originalPrice.toFixed(2)}</Typography>
								</Stack>
							</Stack>
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PopularProducts;
