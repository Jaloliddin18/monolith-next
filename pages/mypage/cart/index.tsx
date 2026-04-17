import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
import MyCart from "../../../libs/components/mypage/MyCart";

const CartPage = () => {
  return (
    <Stack id="cart-page">
      <Stack className="cart-breadcrumb" direction="row" gap="8px">
        <Link href="/">
          <Typography className="breadcrumb-link">Home</Typography>
        </Link>
        <Typography className="breadcrumb-sep">/</Typography>
        <Link href="/mypage">
          <Typography className="breadcrumb-link">My Page</Typography>
        </Link>
        <Typography className="breadcrumb-sep">/</Typography>
        <Typography className="breadcrumb-current">My Cart</Typography>
      </Stack>
      <MyCart />
    </Stack>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(CartPage);
