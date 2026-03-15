import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const stats = [
	{ label: 'Year of Experience', value: '12+' },
	{ label: 'Categories', value: '50+' },
	{ label: 'Trusted companies', value: '20+' },
];

const IntroSection = () => {
	return (
		<Stack className="intro-section">
			<Stack className="intro-container" direction="row" alignItems="center">
				{/* Left Image */}
				<Box className="intro-image">
					<img src="/img/furniture/intro-room.png" alt="StyleCasa Room" />
				</Box>

				{/* Right Content */}
				<Box className="intro-content">
					<Typography className="section-title" variant="h2">
						Introducing StyleCasa
					</Typography>
					<Typography className="intro-desc" variant="body1">
						StyleCasa is a premier destination for individuals seeking a harmonious blend of modern
						aesthetics and timeless sophistication in their home.
					</Typography>

					<Stack className="intro-stats" gap={2}>
						{stats.map((stat) => (
							<Stack key={stat.label} direction="row" justifyContent="space-between" alignItems="center" className="stat-row">
								<Typography variant="body1">{stat.label}</Typography>
								<Typography variant="h4" className="stat-value">
									{stat.value}
								</Typography>
							</Stack>
						))}
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
};

export default IntroSection;
