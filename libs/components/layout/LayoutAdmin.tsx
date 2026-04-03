import React from 'react';
import { Stack, Box } from '@mui/material';
import AdminMenuList from '../admin/AdminMenuList';

const withAdminLayout = (Component: any) => {
	return (props: any) => {
		return (
			<Stack id="pc-wrap" direction="row">
				<Box
					component="aside"
					sx={{ width: 240, minHeight: '100vh', background: '#1C1A17', flexShrink: 0 }}
				>
					<AdminMenuList />
				</Box>
				<Box component="main" sx={{ flex: 1, p: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
					<Component {...props} />
				</Box>
			</Stack>
		);
	};
};

export default withAdminLayout;
