import { Stack } from "@mui/material";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
import AddFurniture from "../../../libs/components/mypage/AddFurniture";

const AddFurniturePage = () => {
  return (
    <Stack>
      <AddFurniture />
    </Stack>
  );
};

export default withLayoutBasic(AddFurniturePage);
