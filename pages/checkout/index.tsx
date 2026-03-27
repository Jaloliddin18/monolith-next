import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CheckoutForm from '../../libs/components/checkout/CheckoutForm';
import OrderSummary from '../../libs/components/checkout/OrderSummary';
import RecentlyViewed from '../../libs/components/furniture/RecentlyViewed';
import { hardcodedRecentlyViewed } from '../../libs/components/mypage/MyWishlist';

const CheckoutPage = () => {
	return (
		<Stack id="checkout-page">
			<Stack className="checkout-content" direction="row">
				<CheckoutForm />
				<OrderSummary />
			</Stack>
			<RecentlyViewed furnitures={hardcodedRecentlyViewed} onLike={() => {}} />
		</Stack>
	);
};

export default withLayoutBasic(CheckoutPage);
