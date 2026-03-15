import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { REACT_APP_API_URL } from '../../config';

const SaleBanner = () => {
	const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 18, mins: 23, secs: 0 });

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				let { days, hours, mins, secs } = prev;
				secs--;
				if (secs < 0) { secs = 59; mins--; }
				if (mins < 0) { mins = 59; hours--; }
				if (hours < 0) { hours = 23; days--; }
				if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
				return { days, hours, mins, secs };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const pad = (n: number) => n.toString().padStart(2, '0');

	return (
		<Stack className="sale-banner-section">
			<Stack className="sale-banner-container" direction="row" alignItems="center" justifyContent="space-between">
				<Box className="sale-banner-left">
					<Typography variant="h3" className="sale-banner-title" color="white" fontWeight={700}>
						30% Off All Furniture Don&apos;t Miss Out!
					</Typography>

					<Stack direction="row" gap={3} className="countdown" mt={3}>
						{[
							{ value: pad(timeLeft.days), label: 'Days' },
							{ value: pad(timeLeft.hours), label: 'Hours' },
							{ value: pad(timeLeft.mins), label: 'Mins' },
							{ value: pad(timeLeft.secs), label: 'Secs' },
						].map((item, i) => (
							<React.Fragment key={item.label}>
								<Box className="countdown-item">
									<Typography variant="h3" color="white" fontWeight={700}>
										{item.value}
									</Typography>
									<Typography variant="caption" color="rgba(255,255,255,0.7)">
										{item.label}
									</Typography>
								</Box>
								{i < 3 && (
									<Typography variant="h3" color="white" fontWeight={700}>
										:
									</Typography>
								)}
							</React.Fragment>
						))}
					</Stack>
				</Box>

				<Stack direction="row" gap={2} className="sale-products">
					{['Nova Sofa', 'Sitting Pretty', 'Sectional Sofa', 'Lounge Chair'].map((name) => (
						<Box key={name} className="sale-product-card">
							<Box className="sale-product-img">
								<img src="/img/furniture/placeholder.png" alt={name} />
							</Box>
							<Typography variant="body2" fontWeight={500} color="white">
								{name}
							</Typography>
							<Typography variant="body2" color="rgba(255,255,255,0.8)">
								$249.00 USD
							</Typography>
						</Box>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SaleBanner;
