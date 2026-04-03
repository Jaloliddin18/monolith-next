import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';

const serviceCards = [
	{
		icon: '/icons/Package.svg',
		alt: 'Product Selection',
		title: 'Extensive Product Selection',
		desc: 'The diverse product selection allows customers to find furniture pieces that align with their style.',
	},
	{
		icon: '/icons/cube_icon.svg',
		alt: 'Design Assistance',
		title: 'Personalized Design Assistance',
		desc: 'To assist customers in creating their dream home, MONOLITH provides personalized design assistance.',
	},
];

const serviceCardsRight = [
	{
		icon: '/icons/security.svg',
		alt: 'Secure Payment',
		title: 'Secure Payment Options',
		desc: 'Customer information and payment details are protected through secure encryption protocols.',
	},
	{
		icon: '/icons/support 1.svg',
		alt: 'Customer Support',
		title: 'Customer Support',
		desc: 'Interacting with customers through social media platforms or newsletters to share updates',
	},
];

const ServiceCard = ({ icon, alt, title, desc }: { icon: string; alt: string; title: string; desc: string }) => (
	<Box className="svc-card">
		<Box className="svc-card-icon">
			<img src={icon} alt={alt} width={60} height={60} />
		</Box>
		<Box className="svc-card-body">
			<Typography className="svc-card-title">{title}</Typography>
			<Typography className="svc-card-desc">{desc}</Typography>
			<Box className="svc-card-link">
				<span>Learn more</span>
				<img src="/icons/ArrowRight.svg" alt="→" width={20} height={20} />
			</Box>
		</Box>
	</Box>
);

const AwesomeServices = () => {
	return (
		<Stack className="awesome-section" alignItems="center">
			<Typography className="awesome-title">Our Awesome Services</Typography>
			<Stack className="awesome-grid" direction="row">
				{/* Left Column */}
				<Stack className="awesome-col" gap="24px">
					{serviceCards.map((card) => (
						<ServiceCard key={card.title} {...card} />
					))}
				</Stack>

				{/* Center - Sale Banner */}
				<Stack className="awesome-sale-card" justifyContent="space-between" alignItems="center">
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
						<Button className="btn-shop-now" disableElevation>
							SHOP NOW
						</Button>
					</Stack>
					<Box className="awesome-sale-image">
						<img src="/img/furniture/luxury_chair.jpg" alt="Sale Chair" />
					</Box>
				</Stack>

				{/* Right Column */}
				<Stack className="awesome-col" gap="24px">
					{serviceCardsRight.map((card) => (
						<ServiceCard key={card.title} {...card} />
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AwesomeServices;
