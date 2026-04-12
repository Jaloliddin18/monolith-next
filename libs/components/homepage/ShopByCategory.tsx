import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

const categories = [
  { icon: "/icons/bed.svg", label: "Desk" },
  { icon: "/icons/Desk.svg", label: "Lamp" },
  { icon: "/icons/chair.svg", label: "Chair" },
  { icon: "/icons/Sofa.svg", label: "Sofas" },
  { icon: "/icons/bed.svg", label: "Bed" },
  { icon: "/icons/Table.svg", label: "Table" },
];

const ShopByCategory = () => {
  const router = useRouter();

  return (
    <Stack className="category-section" alignItems="center" gap="50px">
      <Stack
        className="category-header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className="section-title-text">Shop by Category</Typography>
        <Stack
          className="view-all-link"
          direction="row"
          alignItems="center"
          gap="10px"
          onClick={() => router.push("/furniture")}
          sx={{ cursor: "pointer" }}
        >
          <Typography>View All </Typography>
          <Box
            component="img"
            src="/icons/ArrowUpRight.svg"
            alt="→"
            width={20}
            height={20}
          />
        </Stack>
      </Stack>
      <Stack className="category-grid" direction="row" gap="24px">
        {categories.map((cat) => (
          <Stack
            key={cat.label}
            className="category-item"
            alignItems="center"
            justifyContent="flex-end"
            gap="10px"
          >
            <Box className="category-icon">
              <img src={cat.icon} alt={cat.label} width={100} height={100} />
            </Box>
            <Typography className="category-label">{cat.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ShopByCategory;
