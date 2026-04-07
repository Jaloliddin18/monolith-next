import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import MyFollowings from "../../../libs/components/mypage/MyFollowings";

const FollowingsPage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <MyFollowings />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(FollowingsPage);
