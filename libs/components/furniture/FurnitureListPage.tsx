import React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "next-i18next";
import { Furniture } from "../../types/furniture/furniture";
import { FIsearch } from "../../types/furniture/furniture.input";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import PopularProducts from "./PopularProducts";
import ReviewSection from "./ReviewSection";
import InstagramSection from "../common/InstagramSection";

interface FurnitureListPageProps {
  furnitures: Furniture[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  sortValue: string;
  searchFilter: FIsearch;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (search: FIsearch) => void;
  onLike: (id: string) => void;
}

const sortOptions = [
  { value: "createdAt_desc", label: "Newly arrived" },
  { value: "recommended", label: "Recommended" },
  { value: "furnitureViews_desc", label: "Popularity" },
  { value: "furnitureLikes_desc", label: "Most Liked" },
  { value: "furnitureDiscount_desc", label: "Best Discount" },
  { value: "furniturePrice_desc", label: "Price: High to Low" },
  { value: "furniturePrice_asc", label: "Price: Low to High" },
];

interface ActiveTag {
  label: string;
  type: "category" | "room" | "style" | "material" | "color" | "price";
  value: string;
  colorHex?: string;
}

const colorMap: Record<string, string> = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GREY: "#808080",
  BROWN: "#8B4513",
  BEIGE: "#F5F5DC",
  RED: "#FF0000",
  BLUE: "#0000FF",
  GREEN: "#008000",
  YELLOW: "#FFD700",
  ORANGE: "#FFA500",
  PINK: "#FFC0CB",
  PURPLE: "#800080",
  NATURAL_WOOD: "#DEB887",
  MULTICOLOR: "#999",
};

const FurnitureListPage = ({
  furnitures,
  total,
  page,
  limit,
  loading,
  sortValue,
  searchFilter,
  onPageChange,
  onSortChange,
  onFilterChange,
  onLike,
}: FurnitureListPageProps) => {
  const { t } = useTranslation("common");
  const getActiveTags = (): ActiveTag[] => {
    const tags: ActiveTag[] = [];
    searchFilter.categoryList?.forEach((cat) => {
      tags.push({
        label: cat.replace(/_/g, " "),
        type: "category",
        value: cat,
      });
    });
    searchFilter.roomList?.forEach((room) => {
      tags.push({ label: room.replace(/_/g, " "), type: "room", value: room });
    });
    searchFilter.styleList?.forEach((style) => {
      tags.push({
        label: style.replace(/_/g, " "),
        type: "style",
        value: style,
      });
    });
    searchFilter.materialList?.forEach((mat) => {
      tags.push({
        label: mat.replace(/_/g, " "),
        type: "material",
        value: mat,
      });
    });
    searchFilter.colorList?.forEach((color) => {
      const label = color.replace(/_/g, " ");
      tags.push({
        label,
        type: "color",
        value: color,
        colorHex: colorMap[color],
      });
    });
    return tags;
  };

  const removeTag = (tag: ActiveTag) => {
    const updated = { ...searchFilter };
    if (tag.type === "category") {
      updated.categoryList = updated.categoryList?.filter(
        (c) => c !== tag.value,
      );
      if (updated.categoryList?.length === 0) delete updated.categoryList;
    } else if (tag.type === "room") {
      updated.roomList = updated.roomList?.filter((r) => r !== tag.value);
      if (updated.roomList?.length === 0) delete updated.roomList;
    } else if (tag.type === "style") {
      updated.styleList = updated.styleList?.filter((s) => s !== tag.value);
      if (updated.styleList?.length === 0) delete updated.styleList;
    } else if (tag.type === "material") {
      updated.materialList = updated.materialList?.filter(
        (m) => m !== tag.value,
      );
      if (updated.materialList?.length === 0) delete updated.materialList;
    } else if (tag.type === "color") {
      updated.colorList = updated.colorList?.filter((c) => c !== tag.value);
      if (updated.colorList?.length === 0) delete updated.colorList;
    }
    onFilterChange(updated);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value);
  };

  const activeTags = getActiveTags();

  return (
    <Stack className="furniture-list-page" id="furniture-list-page">
      {/* Hero Banner */}
      <Stack
        className="furniture-hero-banner"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack className="hero-text-side" gap="40px">
          <Stack gap="24px">
            <Stack gap="12px">
              <Typography className="hero-discount-label">
                {t("shopHeroDiscount")}
              </Typography>
              <Typography className="hero-heading">
                {t("shopHeroHeading")}
              </Typography>
            </Stack>
            <Typography className="hero-price">$ 1249.10</Typography>
          </Stack>
          <Link href="/furniture">
            <Box className="hero-shop-btn">
              <Typography className="hero-shop-btn-text">
                {t("SHOP NOW")}
              </Typography>
            </Box>
          </Link>
        </Stack>
        <Box className="hero-image-side">
          <img src="/img/shop/shop4.webp" alt="Featured furniture" />
        </Box>
      </Stack>

      {/* Active Filters Bar + Sort */}
      <Stack className="filter-tags-bar" gap="14px" alignItems="flex-end">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: 1140 }}
        >
          <Stack
            className="filter-tags-list"
            direction="row"
            flexWrap="wrap"
            gap="14px"
            alignItems="center"
          >
            {activeTags.map((tag, i) => (
              <Stack
                key={i}
                className="filter-tag-chip"
                direction="row"
                alignItems="center"
                gap="12px"
              >
                {tag.colorHex && (
                  <Box
                    className="tag-color-dot"
                    sx={{ background: tag.colorHex }}
                  />
                )}
                <Typography className="tag-chip-label">{tag.label}</Typography>
                <Box className="tag-chip-close" onClick={() => removeTag(tag)}>
                  ×
                </Box>
              </Stack>
            ))}
          </Stack>
          <Box className="sort-box" sx={{ position: "relative" }}>
            <Stack
              className="sort-box-inner"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" gap="12px" alignItems="center">
                <Typography className="sort-label">Sort by:</Typography>
                <Typography className="sort-value">
                  {sortOptions.find((o) => o.value === sortValue)?.label ??
                    "Recommended"}
                </Typography>
              </Stack>
              <Box
                component="img"
                src="/icons/CaretDown.svg"
                alt="▾"
                width={24}
                height={24}
              />
            </Stack>
            <Select
              value={sortValue}
              onChange={handleSortChange}
              className="sort-select-hidden"
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    border: "1px solid #e6e6e6",
                    borderRadius: 0,
                    boxShadow: "0px 10px 30px 0px rgba(0,0,0,0.05)",
                    padding: "24px 32px",
                    minWidth: "200px",
                    "& .MuiList-root": {
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    },
                  },
                },
              }}
            >
              {sortOptions.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "27px",
                    color: opt.value === sortValue ? "#000" : "#999",
                    padding: 0,
                    minHeight: "unset",
                    "&:hover": { background: "none", color: "#000" },
                    "&.Mui-selected": { background: "none", color: "#000" },
                    "&.Mui-selected:hover": { background: "none" },
                  }}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
        <Typography className="results-count">
          {total > 0
            ? `Showing ${(page - 1) * limit + 1}-${Math.min(page * limit, total)} of ${total} results`
            : "Showing 0 of 0 results"}
        </Typography>
      </Stack>

      {/* Main Content: Sidebar + Grid */}
      <Stack className="main-content" direction="row" gap="23px">
        <FilterSidebar
          searchFilter={searchFilter}
          onFilterChange={onFilterChange}
        />
        {loading ? (
          <Stack className="product-grid-area">
            <Stack className="grid-cards" direction="row" flexWrap="wrap">
              {[...Array(8)].map((_, i) => (
                <Box key={i} className="grid-card-wrapper">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={380}
                    sx={{ borderRadius: '8px' }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        ) : (
          <ProductGrid
            furnitures={furnitures}
            total={total}
            page={page}
            limit={limit}
            onPageChange={onPageChange}
            onLike={onLike}
          />
        )}
      </Stack>

      {/* Popular Products */}
      <PopularProducts />

      {/* Reviews */}
      <ReviewSection />

      {/* Instagram */}
      <InstagramSection />
    </Stack>
  );
};

export default FurnitureListPage;
