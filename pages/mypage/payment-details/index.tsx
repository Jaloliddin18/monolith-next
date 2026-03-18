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

export default withLayoutBasic(PaymentDetailsPage);
