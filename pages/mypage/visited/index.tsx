import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import MyVisited from "../../../libs/components/mypage/MyVisited";

const VisitedPage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <MyVisited />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(VisitedPage);
