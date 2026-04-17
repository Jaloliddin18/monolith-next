import { Stack } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(WriteArticlePage);
