import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import ManageAddress from "../../../libs/components/mypage/ManageAddress";

const ManageAddressPage = () => {
  return (
    <MyPageLayout>
      <ManageAddress />
    </MyPageLayout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutBasic(ManageAddressPage);
