import React from 'react';
import { Stack } from '@mui/material';
import MyPageSidebar from './MyPageSidebar';

interface MyPageLayoutProps {
	children: React.ReactNode;
}

const MyPageLayout = ({ children }: MyPageLayoutProps) => {
	return (
		<Stack id="mypage-page">
			<MyPageSidebar />
			<Stack className="mypage-content">{children}</Stack>
		</Stack>
	);
};

export default MyPageLayout;
