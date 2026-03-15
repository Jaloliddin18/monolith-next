import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StoreFinder = () => {
	return (
		<Stack className="store-finder-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={3}>
				Find Furniture store
			</Typography>
			<Stack direction="row" justifyContent="center" alignItems="center" gap={2} className="store-finder-form">
				<Box className="store-input">
					<Typography variant="caption" color="text.secondary">
						City
					</Typography>
					<Stack direction="row" alignItems="center" gap={1}>
						<LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#999' }} />
						<Typography variant="body2">add location</Typography>
					</Stack>
				</Box>
				<Button variant="contained" className="btn-find-store">
					Find Store
				</Button>
			</Stack>
		</Stack>
	);
};

export default StoreFinder;
