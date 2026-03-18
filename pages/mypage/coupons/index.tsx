import React from 'react';
import { Typography, Box } from '@mui/material';
import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';

const CouponsPage = () => {
	return (
		<MyPageLayout>
			<Typography className="content-title">My Coupons</Typography>
			<Box className="placeholder-content">No coupons available</Box>
		</MyPageLayout>
	);
};

export default withLayoutBasic(CouponsPage);
