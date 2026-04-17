import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';
import MyCoupons from '../../../libs/components/mypage/MyCoupons';

const CouponsPage = () => {
	return (
		<MyPageLayout>
			<MyCoupons />
		</MyPageLayout>
	);
};

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutMypage(CouponsPage);
