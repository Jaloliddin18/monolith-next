import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import PaymentDetails from "../../../libs/components/mypage/PaymentDetails";

const PaymentDetailsPage = () => {
  return (
    <MyPageLayout>
      <PaymentDetails />
    </MyPageLayout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutBasic(PaymentDetailsPage);
