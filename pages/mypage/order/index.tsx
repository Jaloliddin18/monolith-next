import React from "react";
import { Typography, Box } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";

const OrdersPage = () => {
  return (
    <MyPageLayout>
      <Typography className="content-title">My Orders</Typography>
      <Box className="placeholder-content">No orders yet</Box>
    </MyPageLayout>
  );
};

export default withLayoutBasic(OrdersPage);
