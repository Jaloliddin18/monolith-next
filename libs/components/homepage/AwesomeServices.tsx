import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AwesomeServices = () => {
	return (
		<Stack className="awesome-section" alignItems="center">
			<Typography className="awesome-title">Our Awesome Services</Typography>
			<Stack className="awesome-grid" direction="row" gap="24px">
				{/* Left Column - 2 service cards */}
				<Stack gap="24px">
					<Box className="svc-card">
						<Box className="svc-card-icon">
							<img src="/icons/Package.svg" alt="Product Selection" width={60} height={60} />
						</Box>
						<Box>
							<Typography className="svc-card-title">Extensive Product Selection</Typography>
							<Typography className="svc-card-desc">
								The diverse product selection allows customers to find furniture pieces that align with their style.
							</Typography>
							<Box className="svc-card-link">
								<span>Learn more</span>
								<ArrowForwardIcon />
							</Box>
						</Box>
					</Box>
					<Box className="svc-card">
						<Box className="svc-card-icon">
							<img src="/icons/cube_icon.svg" alt="Design Assistance" width={60} height={60} />
						</Box>
						<Box>
							<Typography className="svc-card-title">Personalized Design Assistance</Typography>
							<Typography className="svc-card-desc">
								To assist customers in creating their dream home, StyleCasa provides personalized design assistance.
							</Typography>
							<Box className="svc-card-link">
								<span>Learn more</span>
								<ArrowForwardIcon />
							</Box>
						</Box>
					</Box>
				</Stack>

				{/* Center - Sale Banner */}
				<Stack className="awesome-sale-card" alignItems="center">
					<Stack className="awesome-sale-content" alignItems="center">
						<Typography className="awesome-sale-title">
							Get <span className="green">50%</span> off
						</Typography>
						<Stack className="awesome-sale-details" alignItems="center">
							<Typography className="awesome-sale-subtitle">world of stylish furniture</Typography>
							<Stack direction="row" alignItems="center" gap="14px">
								<Typography className="awesome-sale-old">$45.99</Typography>
								<Typography className="awesome-sale-price">$21.99</Typography>
							</Stack>
						</Stack>
						<Button className="btn-shop-now" variant="contained">
							SHOP NOW
						</Button>
					</Stack>
					<Box className="awesome-sale-image">
						<img src="/img/furniture/soft_chair.png" alt="Sale Chair" />
					</Box>
				</Stack>

				{/* Right Column - 2 service cards */}
				<Stack gap="24px">
					<Box className="svc-card">
						<Box className="svc-card-icon">
							<img src="/icons/security.svg" alt="Secure Payment" width={60} height={60} />
						</Box>
						<Box>
							<Typography className="svc-card-title">Secure Payment Options</Typography>
							<Typography className="svc-card-desc">
								Customer information and payment details are protected through secure encryption protocols.
							</Typography>
							<Box className="svc-card-link">
								<span>Learn more</span>
								<ArrowForwardIcon />
							</Box>
						</Box>
					</Box>
					<Box className="svc-card">
						<Box className="svc-card-icon">
							<img src="/icons/c_icon.svg" alt="Customer Support" width={60} height={60} />
						</Box>
						<Box>
							<Typography className="svc-card-title">Customer Support</Typography>
							<Typography className="svc-card-desc">
								Interacting with customers through social media platforms or newsletters to share updates
							</Typography>
							<Box className="svc-card-link">
								<span>Learn more</span>
								<ArrowForwardIcon />
							</Box>
						</Box>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AwesomeServices;
