import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import MyFollowers from "../../../libs/components/mypage/MyFollowers";

const FollowersPage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <MyFollowers />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(FollowersPage);
