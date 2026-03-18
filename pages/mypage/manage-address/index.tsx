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

export default withLayoutBasic(ManageAddressPage);
