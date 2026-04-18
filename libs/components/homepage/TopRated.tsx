import React, { useRef } from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";

interface TopRatedProps {
  furnitures?: Furniture[];
  onLike?: (id: string) => void;
}

const TopRated = ({ furnitures = [], onLike }: TopRatedProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!furnitures.length) return null;

  return (
    <Stack className="top-rated-section" gap="40px">
      <Box className="info-box">
        <Box className="left">
          <span>Top Rated Furniture</span>
          <p>Check out our top rated items</p>
        </Box>
        <Box className="homepage-swiper-nav">
          <button
            ref={prevRef}
            type="button"
            className="homepage-swiper-btn"
            aria-label="Previous top rated products"
          >
            <WestIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="homepage-swiper-btn"
            aria-label="Next top rated products"
          >
            <EastIcon sx={{ fontSize: 16 }} />
          </button>
        </Box>
      </Box>

      <Box className="section-swiper-wrap">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation;
            if (navigation && typeof navigation !== "boolean") {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          pagination={{ clickable: true }}
          style={{ width: "100%", paddingBottom: "48px" }}
        >
          {furnitures.map((furniture) => (
            <SwiperSlide key={furniture._id}>
              <ProductCard furniture={furniture} size="small" onLike={onLike} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default TopRated;
