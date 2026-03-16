import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';

const HeroSection = () => {
	return (
		<Stack className="hero-section">
			<Box className="hero-bg" />
			<Stack className="hero-container" direction="row" alignItems="center">
				<Stack className="hero-left">
					<Stack className="hero-text-block">
						<Typography className="hero-title">
							Explore Our Collection of Chairs and Seating Furniture
						</Typography>
						<Typography className="hero-subtitle">
							Elevate your living environment with StyleCasa&apos;s modern furniture collection.
						</Typography>
					</Stack>
					<Stack className="hero-cta" direction="row" alignItems="center" gap="24px">
						<Typography className="hero-price">$139.99</Typography>
						<Button className="btn-hero-cta" variant="contained">
							ADD TO CART
						</Button>
					</Stack>
				</Stack>
				<Box className="hero-right">
					<img src="/img/furniture/plant_tripod.png" alt="Featured Chair" />
				</Box>
			</Stack>
		</Stack>
	);
};

export default HeroSection;
