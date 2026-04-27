import React, { useRef } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";

interface TopRatedProps {
  furnitures?: Furniture[];
  onLike?: (id: string) => void;
  loading?: boolean;
}

const TopRated = ({ furnitures = [], onLike, loading }: TopRatedProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (!loading && !furnitures.length) return null;

  return (
    <Stack className="top-rated-section" gap="40px">
      <Box className="info-box">
        <Box className="left">
          <span>Top Rated Furniture</span>
          <p>Check out our top rated items</p>
        </Box>
        <div className="section-nav-arrows">
          <button
            className="section-arrow section-arrow--prev"
            onClick={scrollLeft}
            aria-label="Previous top rated products"
          >
            ←
          </button>
          <button
            className="section-arrow section-arrow--next"
            onClick={scrollRight}
            aria-label="Next top rated products"
          >
            →
          </button>
        </div>
      </Box>

      {loading ? (
        <div style={{ display: "flex", gap: "24px" }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="25%" height={380} sx={{ borderRadius: "8px" }} />
          ))}
        </div>
      ) : (
        <div className="section-swiper-wrap">
          <div ref={scrollRef} className="section-scroll-container">
            {furnitures.map((furniture) => (
              <div className="section-scroll-item" key={furniture._id}>
                <ProductCard furniture={furniture} size="small" onLike={onLike} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Stack>
  );
};

export default TopRated;
