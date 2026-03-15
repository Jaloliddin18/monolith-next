import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';

const HeroSection = () => {
	return (
		<Stack className="hero-section">
			<Stack className="hero-container" direction="row" alignItems="center">
				{/* Left Content */}
				<Box className="hero-left">
					<Typography className="hero-title" variant="h1">
						Explore Our Collection of Chairs and Seating Furniture
					</Typography>
					<Typography className="hero-subtitle" variant="body1">
						Elevate your living environment with StyleCasa&apos;s modern furniture collection.
					</Typography>
					<Stack direction="row" alignItems="center" gap={3} className="hero-cta">
						<Typography className="hero-price" variant="h3">
							$139.99
						</Typography>
						<Button variant="contained" className="btn-add-cart">
							ADD TO CART
						</Button>
					</Stack>
				</Box>

				{/* Right Image */}
				<Box className="hero-right">
					<Box className="hero-image-wrapper">
						<img src="/img/furniture/hero-chair.png" alt="Featured Chair" />
					</Box>
				</Box>
			</Stack>
		</Stack>
	);
};

export default HeroSection;
