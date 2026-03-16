import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';

const saleProducts = [
	{ name: 'Nova Sofa', price: '$249.00 USD', bg: '#fbfff2', width: 655 },
	{ name: 'Sitting Pretty', price: '$249.00 USD', bg: '#fffbf3', width: 461 },
	{ name: 'Sectional Sofa', price: '$249.00 USD', bg: '#fff7f7', width: 461 },
	{ name: 'Lounge Chair', price: '$249.00 USD', bg: '#f2faff', width: 655 },
];

const SaleBanner = () => {
	const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 18, mins: 23, secs: 0 });

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				let { days, hours, mins, secs } = prev;
				secs--;
				if (secs < 0) {
					secs = 59;
					mins--;
				}
				if (mins < 0) {
					mins = 59;
					hours--;
				}
				if (hours < 0) {
					hours = 23;
					days--;
				}
				if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
				return { days, hours, mins, secs };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const pad = (n: number) => n.toString().padStart(2, '0');

	return (
		<Stack className="sale-banner-section" alignItems="center" gap="50px">
			{/* Header: Title + Countdown */}
			<Stack className="sale-banner-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="sale-banner-title">
					<span className="red">30% Off </span>All Furniture
					<br />
					Don&apos;t Miss Out!
				</Typography>
				<Stack className="countdown-wrapper" gap="4px">
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

			{/* Sale product cards in 2 rows */}
			<Stack gap="24px">
				<Stack direction="row" gap="24px">
					<Box className="sale-product-card sale-card-wide" sx={{ background: saleProducts[0].bg }}>
						<Stack className="sale-product-info" gap="8px">
							<Box className="sale-rating">
								<Box className="rating-badge">
									<Typography className="rating-value">4.7</Typography>
									<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
								</Box>
								<Typography className="rating-count">(12,125)</Typography>
							</Box>
							<Typography className="sale-product-name">{saleProducts[0].name}</Typography>
							<Typography className="sale-product-price">{saleProducts[0].price}</Typography>
						</Stack>
						<Box className="sale-product-image">
							<img src="/img/furniture/placeholder.png" alt={saleProducts[0].name} />
						</Box>
					</Box>
					<Box className="sale-product-card sale-card-narrow sale-card-blurred" sx={{ background: saleProducts[1].bg }}>
						<Stack className="sale-product-info" gap="8px">
							<Box className="sale-rating">
								<Box className="rating-badge">
									<Typography className="rating-value">4.7</Typography>
									<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
								</Box>
								<Typography className="rating-count">(12,125)</Typography>
							</Box>
							<Typography className="sale-product-name">{saleProducts[1].name}</Typography>
							<Typography className="sale-product-price">{saleProducts[1].price}</Typography>
						</Stack>
						<Box className="sale-card-overlay">
							<Button className="btn-view-all-sale" variant="contained">
								VIEW ALL
							</Button>
						</Box>
					</Box>
				</Stack>
				<Stack direction="row" gap="24px">
					<Box className="sale-product-card sale-card-narrow" sx={{ background: saleProducts[2].bg }}>
						<Stack className="sale-product-info" gap="8px">
							<Box className="sale-rating">
								<Box className="rating-badge">
									<Typography className="rating-value">4.7</Typography>
									<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
								</Box>
								<Typography className="rating-count">(12,125)</Typography>
							</Box>
							<Typography className="sale-product-name">{saleProducts[2].name}</Typography>
							<Typography className="sale-product-price">{saleProducts[2].price}</Typography>
						</Stack>
						<Box className="sale-product-image">
							<img src="/img/furniture/placeholder.png" alt={saleProducts[2].name} />
						</Box>
					</Box>
					<Box className="sale-product-card sale-card-wide" sx={{ background: saleProducts[3].bg }}>
						<Stack className="sale-product-info" gap="8px">
							<Box className="sale-rating">
								<Box className="rating-badge">
									<Typography className="rating-value">4.7</Typography>
									<img src="/icons/star_icon.svg" alt="star" width={16} height={16} />
								</Box>
								<Typography className="rating-count">(12,125)</Typography>
							</Box>
							<Typography className="sale-product-name">{saleProducts[3].name}</Typography>
							<Typography className="sale-product-price">{saleProducts[3].price}</Typography>
						</Stack>
						<Box className="sale-product-image">
							<img src="/img/furniture/placeholder.png" alt={saleProducts[3].name} />
						</Box>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SaleBanner;
