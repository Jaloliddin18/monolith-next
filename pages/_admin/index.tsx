import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const Admin = () => {
	return (
		<Stack className="admin-page">
			<div>Admin Dashboard</div>
		</Stack>
	);
};

export default withLayoutBasic(Admin);
