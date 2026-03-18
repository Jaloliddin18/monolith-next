import React from 'react';
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

export default withLayoutBasic(MyPage);
