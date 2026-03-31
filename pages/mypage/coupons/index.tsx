import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';
import MyCoupons from '../../../libs/components/mypage/MyCoupons';

const CouponsPage = () => {
	return (
		<MyPageLayout>
			<MyCoupons />
		</MyPageLayout>
	);
};

export default withLayoutBasic(CouponsPage);
