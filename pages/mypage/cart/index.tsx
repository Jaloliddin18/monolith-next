import React from 'react';
import { Typography, Box } from '@mui/material';
import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';

const CartPage = () => {
	return (
		<MyPageLayout>
			<Typography className="content-title">My Cart</Typography>
			<Box className="placeholder-content">Your cart is empty</Box>
		</MyPageLayout>
	);
};

export default withLayoutBasic(CartPage);
