import React from 'react';
import { Typography, Box } from '@mui/material';
import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';

const WishlistPage = () => {
	return (
		<MyPageLayout>
			<Typography className="content-title">My Wishlist</Typography>
			<Box className="placeholder-content">Your wishlist is empty</Box>
		</MyPageLayout>
	);
};

export default withLayoutBasic(WishlistPage);
