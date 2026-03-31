import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const IntroSection = () => {
	return (
		<Stack className="intro-section" direction="row">
			<Stack className="intro-content">
				<Stack className="intro-text">
					<Typography className="intro-title">Introducing StyleCasa</Typography>
					<Typography className="intro-desc">
						StyleCasa is a premier destination for individuals seeking a harmonious blend of modern aesthetics
						and timeless sophistication in their home.
					</Typography>
				</Stack>
				<Stack className="intro-stats">
					<Stack className="stat-row" direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="stat-label">Year of Experience</Typography>
						<Typography className="stat-value">12+</Typography>
					</Stack>
					<Stack className="stat-row" direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="stat-label">Categories</Typography>
						<Typography className="stat-value">50+</Typography>
					</Stack>
					<Stack className="stat-row" direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="stat-label">Trusted companies</Typography>
						<Typography className="stat-value">20+</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Box className="intro-image">
				<img src="/img/furniture/luxury_chair.jpg" alt="StyleCasa Furniture" />
			</Box>
		</Stack>
	);
};

export default IntroSection;
