import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';

const AwesomeServices = () => {
	return (
		<Stack className="awesome-services-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={5}>
				Our Awesome Services
			</Typography>

			{/* Top Row - 2 big cards */}
			<Stack className="awesome-top-row" direction="row" gap={3}>
				<Box className="awesome-card big">
					<img src="/img/furniture/service-selection.png" alt="Product Selection" />
					<Box className="awesome-card-content">
						<Typography variant="h5" fontWeight={600}>
							Extensive Product Selection
						</Typography>
						<Typography variant="body2" color="text.secondary">
							The diverse product selection allows customers to find furniture pieces that align with their style.
						</Typography>
						<Stack direction="row" alignItems="center" gap={1} className="card-link">
							<Typography variant="body2">Learn More</Typography>
							<ArrowForwardIcon sx={{ fontSize: 16 }} />
						</Stack>
					</Box>
				</Box>

				<Box className="awesome-card big">
					<img src="/img/furniture/service-design.png" alt="Design Assistance" />
					<Box className="awesome-card-content">
						<Typography variant="h5" fontWeight={600}>
							Personalized Design Assistance
						</Typography>
						<Typography variant="body2" color="text.secondary">
							To assist customers in creating their dream home, StyleCasa provides personalized design assistance.
						</Typography>
						<Stack direction="row" alignItems="center" gap={1} className="card-link">
							<Typography variant="body2">Learn More</Typography>
							<ArrowForwardIcon sx={{ fontSize: 16 }} />
						</Stack>
					</Box>
				</Box>
			</Stack>

			{/* Bottom Row - sale banner + 2 small cards */}
			<Stack className="awesome-bottom-row" direction="row" gap={3} mt={3}>
				<Box className="sale-banner">
					<Typography className="sale-text" variant="h4">
						Get 50% off
					</Typography>
					<Typography variant="body2">world of stylish furniture</Typography>
					<Stack direction="row" alignItems="center" gap={2} mt={2}>
						<Typography className="sale-price old">$45.99</Typography>
						<Typography className="sale-price new">$21.99</Typography>
					</Stack>
					<Box className="sale-image">
						<img src="/img/furniture/sale-chair.png" alt="Sale" />
					</Box>
				</Box>

				<Box className="awesome-card small">
					<Box className="awesome-card-content">
						<SecurityOutlinedIcon sx={{ fontSize: 40, color: '#a0616a' }} />
						<Typography variant="h6" fontWeight={600} mt={1}>
							Secure Payment Options
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Customer information and payment details are protected through secure encryption protocols.
						</Typography>
					</Box>
				</Box>

				<Box className="awesome-card small">
					<Box className="awesome-card-content">
						<HeadsetMicOutlinedIcon sx={{ fontSize: 40, color: '#a0616a' }} />
						<Typography variant="h6" fontWeight={600} mt={1}>
							Customer Support
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Interacting with customers through social media platforms or newsletters to share updates.
						</Typography>
					</Box>
				</Box>
			</Stack>
		</Stack>
	);
};

export default AwesomeServices;
