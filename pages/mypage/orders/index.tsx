import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
import MyOrders from "../../../libs/components/mypage/MyOrders";

const OrdersPage = () => {
  return (
    <Stack id="orders-page">
      <Stack className="orders-breadcrumb" direction="row" gap="8px">
        <Link href="/">
          <Typography className="breadcrumb-link">Home</Typography>
        </Link>
        <Link href="/mypage">
          <Typography className="breadcrumb-link">/ My Page</Typography>
        </Link>
        <Typography className="breadcrumb-current">/ My Orders</Typography>
      </Stack>
      <MyOrders />
    </Stack>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(OrdersPage);
