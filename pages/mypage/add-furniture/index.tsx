import { Stack } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutMypage from '../../../libs/components/layout/LayoutMypage';
import AddFurniture from "../../../libs/components/mypage/AddFurniture";

const AddFurniturePage = () => {
  return (
    <Stack>
      <AddFurniture />
    </Stack>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLayoutMypage(AddFurniturePage);
