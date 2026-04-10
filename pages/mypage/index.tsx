import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../libs/components/mypage/MyPageLayout';
import PersonalInfo from '../../libs/components/mypage/PersonalInfo';

const MyPage = () => {
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

export default withLayoutBasic(MyPage);
