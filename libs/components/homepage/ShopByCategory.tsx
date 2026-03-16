import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const categories = [
	{ icon: '/icons/bed.svg', label: 'Lemp' },
	{ icon: '/icons/oval_icon.svg', label: 'Desks' },
	{ icon: '/icons/chair.svg', label: 'Chair' },
	{ icon: '/icons/window_icon.svg', label: 'Sofas' },
	{ icon: '/icons/bed.svg', label: 'Bed' },
	{ icon: '/icons/oval_icon.svg', label: 'Table' },
];

const ShopByCategory = () => {
	return (
		<Stack className="category-section" alignItems="center" gap="50px">
			<Stack className="category-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Shop by Category</Typography>
				<Stack className="view-all-link" direction="row" alignItems="center" gap="10px">
					<Typography>View All </Typography>
					<ArrowOutwardIcon sx={{ fontSize: 20 }} />
				</Stack>
			</Stack>
			<Stack className="category-grid" direction="row" gap="24px">
				{categories.map((cat) => (
					<Stack key={cat.label} className="category-item" alignItems="center" justifyContent="flex-end" gap="10px">
						<Box className="category-icon">
							<img src={cat.icon} alt={cat.label} width={100} height={100} />
						</Box>
						<Typography className="category-label">{cat.label}</Typography>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};

export default ShopByCategory;
