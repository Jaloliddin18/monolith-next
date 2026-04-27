import React, { useRef } from "react";
import { Box, Stack, Skeleton, Typography } from "@mui/material";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";
import useDeviceDetect from "../../hooks/useDeviceDetect";

interface TopRatedProps {
  furnitures?: Furniture[];
  onLike?: (id: string) => void;
  loading?: boolean;
}

const TopRated = ({ furnitures = [], onLike, loading }: TopRatedProps) => {
  const device = useDeviceDetect();
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const scrollMobileLeft = () => {
    mobileScrollRef.current?.scrollBy({ left: -(window.innerWidth - 32), behavior: "smooth" });
  };

  const scrollMobileRight = () => {
    mobileScrollRef.current?.scrollBy({ left: window.innerWidth - 32, behavior: "smooth" });
  };

  if (!loading && !furnitures.length) return null;

  if (device === 'mobile') {
    return (
      <Stack className="top-rated-mobile">
        <Stack className="section-header-mobile">
          <Typography className="section-title-mobile">Top Rated</Typography>
          <Stack direction="row" gap={1} className="mobile-arrows-row">
            <button className="mobile-arrow" onClick={scrollMobileLeft} aria-label="Previous">←</button>
            <button className="mobile-arrow" onClick={scrollMobileRight} aria-label="Next">→</button>
          </Stack>
        </Stack>
        {loading ? (
          <div className="mobile-scroll-container">
            {[...Array(2)].map((_, i) => (
              <div className="mobile-card-item" key={i}>
                <Skeleton variant="rectangular" width="100%" height={280} sx={{ borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={mobileScrollRef} className="mobile-scroll-container">
            {furnitures.map((furniture) => (
              <div className="mobile-card-item" key={furniture._id}>
                <ProductCard furniture={furniture} size="small" onLike={onLike} />
              </div>
            ))}
          </div>
        )}
      </Stack>
    );
  }

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
