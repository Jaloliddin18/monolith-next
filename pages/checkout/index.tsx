import { Stack, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CheckoutForm from '../../libs/components/checkout/CheckoutForm';
import OrderSummary from '../../libs/components/checkout/OrderSummary';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const CheckoutPage = () => {
	const device = useDeviceDetect();

	if (!device) return null;

	if (device === 'mobile') {
		return (
			<Stack className="mobile-page-placeholder">
				<Typography className="mobile-page-title">Checkout</Typography>
				<Typography className="mobile-page-subtitle">Mobile version coming soon</Typography>
			</Stack>
		);
	}

	return (
		<Stack id="checkout-page">
			<Stack className="checkout-content" direction="row">
				<CheckoutForm />
				<OrderSummary />
			</Stack>
		</Stack>
	);
};

export const getServerSideProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(CheckoutPage);
