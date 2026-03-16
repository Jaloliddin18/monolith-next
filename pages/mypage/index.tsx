import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const MyPage = () => {
	return (
		<Stack className="mypage">
			<div>My Page</div>
		</Stack>
	);
};

export default withLayoutBasic(MyPage);
