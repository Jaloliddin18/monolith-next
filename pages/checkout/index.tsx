import { Stack } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CheckoutForm from '../../libs/components/checkout/CheckoutForm';
import OrderSummary from '../../libs/components/checkout/OrderSummary';
const CheckoutPage = () => {
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
