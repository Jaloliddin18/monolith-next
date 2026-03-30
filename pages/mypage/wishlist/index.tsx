import { Stack } from '@mui/material';
import withLayoutBasic from '../../../libs/components/layout/LayoutBasic';
import MyPageLayout from '../../../libs/components/mypage/MyPageLayout';
import MyWishlist from '../../../libs/components/mypage/MyWishlist';
import RecentlyViewed from '../../../libs/components/furniture/RecentlyViewed';

const WishlistPage = () => {
	return (
		<Stack>
			<MyPageLayout>
				<MyWishlist />
			</MyPageLayout>
			<RecentlyViewed />
		</Stack>
	);
};

export default withLayoutBasic(WishlistPage);
