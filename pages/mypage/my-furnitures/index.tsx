import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import MyPageLayout from "../../../libs/components/mypage/MyPageLayout";
import MyFurnitures from "../../../libs/components/mypage/MyFurnitures";

const MyFurnituresPage = () => {
  return (
    <Stack>
      <MyPageLayout>
        <MyFurnitures />
      </MyPageLayout>
    </Stack>
  );
};

export default withLayoutBasic(MyFurnituresPage);
