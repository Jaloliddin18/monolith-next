import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Stack, Typography } from '@mui/material';
import withLayoutMypage from '../../libs/components/layout/LayoutMypage';
import MyPageLayout from '../../libs/components/mypage/MyPageLayout';
import PersonalInfo from '../../libs/components/mypage/PersonalInfo';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const MyPage = () => {
	const device = useDeviceDetect();

	if (!device) return null;

	if (device === 'mobile') {
		return (
			<Stack className="mobile-page-placeholder">
				<Typography className="mobile-page-title">My Account</Typography>
				<Typography className="mobile-page-subtitle">Mobile version coming soon</Typography>
			</Stack>
		);
	}

	return (
		<MyPageLayout>
			<PersonalInfo />
		</MyPageLayout>
	);
};

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutMypage(MyPage);
