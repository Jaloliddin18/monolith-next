import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import WriteArticle from "../../../libs/components/mypage/WriteArticle";

const WriteArticlePage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <WriteArticle />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(WriteArticlePage);
