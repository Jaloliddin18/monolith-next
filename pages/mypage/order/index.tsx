import React from "react";
import { Typography, Box } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";

const OrdersPage = () => {
  return (
    <MyPageLayout>
      <Typography className="content-title">My Orders</Typography>
      <Box className="placeholder-content">No orders yet</Box>
    </MyPageLayout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(OrdersPage);
