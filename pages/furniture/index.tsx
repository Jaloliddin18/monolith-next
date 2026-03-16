import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const FurnitureList = () => {
	return (
		<Stack className="furniture-list-page">
			<div>Furniture List</div>
		</Stack>
	);
};

export default withLayoutBasic(FurnitureList);
