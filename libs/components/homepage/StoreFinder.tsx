import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StoreFinder = () => {
	return (
		<Stack className="store-finder-section" direction="row" justifyContent="space-between" alignItems="center">
			<Typography className="store-finder-title">Find Furniture store</Typography>
			<Stack className="store-finder-form" direction="row" alignItems="center" justifyContent="space-between">
				<Stack direction="row" alignItems="center" gap="20px">
					<Stack className="store-city-dropdown" direction="row" alignItems="center" gap="10px">
						<Typography className="city-text">City</Typography>
						<KeyboardArrowDownIcon sx={{ fontSize: 24, color: '#000' }} />
					</Stack>
					<Typography className="store-location-placeholder">add location</Typography>
				</Stack>
				<Button className="btn-search" variant="contained">
					SEARCH
				</Button>
			</Stack>
		</Stack>
	);
};

export default StoreFinder;
