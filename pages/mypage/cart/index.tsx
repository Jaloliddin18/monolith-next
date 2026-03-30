import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyCart from "../../../libs/components/mypage/MyCart";
import RecentlyViewed from "../../../libs/components/furniture/RecentlyViewed";

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
      <RecentlyViewed />
    </Stack>
  );
};

export default withLayoutBasic(CartPage);
