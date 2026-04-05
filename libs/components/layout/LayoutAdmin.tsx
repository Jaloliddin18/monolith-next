import React from 'react';
import { Stack, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AdminMenuList from '../admin/AdminMenuList';

const withAdminLayout = (Component: any) => {
	return (props: any) => {
		return (
			<Stack id="admin-wrap" direction="row">
				<Box
					component="aside"
					sx={{ width: 240, minHeight: '100vh', background: '#ffffff', flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.08)' }}
				>
					<AdminMenuList />
				</Box>
				<Box component="main" sx={{ flex: 1, background: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
					<Box className="admin-header">
						<Avatar src="/img/profile/defaultUser.svg" sx={{ width: 36, height: 36 }} />
					</Box>
					<Box sx={{ p: '32px 40px' }}>
						<Component {...props} />
					</Box>
				</Box>
			</Stack>
		);
	};
};

export default withAdminLayout;
