import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import MyArticles from "../../../libs/components/mypage/MyArticles";

const ArticlesPage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <MyArticles />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(ArticlesPage);
