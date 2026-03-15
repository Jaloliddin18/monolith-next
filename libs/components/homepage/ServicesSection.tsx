import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

const services = [
	{
		icon: <LocalShippingOutlinedIcon />,
		title: 'Free Shipping',
		desc: 'From all orders over $100',
	},
	{
		icon: <MonetizationOnOutlinedIcon />,
		title: 'Free Returns',
		desc: 'Return money within 30 days',
	},
	{
		icon: <VerifiedUserOutlinedIcon />,
		title: 'Secure Shopping',
		desc: "You're in safe hands",
	},
	{
		icon: <WorkspacePremiumOutlinedIcon />,
		title: 'Best Quality',
		desc: 'We have everything you need',
	},
];

const ServicesSection = () => {
	return (
		<Stack className="services-section">
			<Stack className="services-container" direction="row" justifyContent="space-between">
				{services.map((service) => (
					<Box key={service.title} className="service-card">
						<Box className="service-icon-wrapper">
							{service.icon}
						</Box>
						<Typography variant="h6" fontWeight={600} mt={2}>
							{service.title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{service.desc}
						</Typography>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default ServicesSection;
