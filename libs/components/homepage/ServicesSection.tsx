import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const services = [
	{ icon: '/icons/Delivery_Truck.svg', title: 'Free Shipping', desc: 'From all orders over $100' },
	{ icon: '/icons/Badge_Dollar.svg', title: 'Free Returns', desc: 'Return money within 30 days' },
	{ icon: '/icons/Package.svg', title: 'Secure Shopping', desc: "You're in safe hands" },
	{ icon: '/icons/reward_icon.svg', title: 'Best Quality', desc: 'We have everything you need' },
];

const ServicesSection = () => {
	return (
		<Stack className="services-section" direction="row" justifyContent="space-between">
			{services.map((svc) => (
				<Stack className="service-card" key={svc.title} alignItems="center">
					<Box className="service-icon-box">
						<Box className="service-icon-inner">
							<img src={svc.icon} alt={svc.title} width={50} height={50} />
						</Box>
					</Box>
					<Stack className="service-card-text" alignItems="center">
						<Typography className="service-card-title">{svc.title}</Typography>
						<Typography className="service-card-desc">{svc.desc}</Typography>
					</Stack>
				</Stack>
			))}
		</Stack>
	);
};

export default ServicesSection;
