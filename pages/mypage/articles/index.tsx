import { Stack } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(ArticlesPage);
