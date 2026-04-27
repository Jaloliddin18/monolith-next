import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";

interface SaleBannerProps {
  furnitures: Furniture[];
  onLike: (id: string) => void;
  loading?: boolean;
}

const getTimeLeft = (target: Date) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
};

const SaleBanner = ({ furnitures, onLike, loading }: SaleBannerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const countdownTarget = useMemo(() => {
    const ends = furnitures
      .filter((f) => f.discountEnd)
      .map((f) => new Date(f.discountEnd!).getTime());
    if (!ends.length) return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    return new Date(Math.min(...ends));
  }, [furnitures]);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(countdownTarget));

  useEffect(() => {
    setTimeLeft(getTimeLeft(countdownTarget));
    const timer = setInterval(
      () => setTimeLeft(getTimeLeft(countdownTarget)),
      1000,
    );
    return () => clearInterval(timer);
  }, [countdownTarget]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (!loading && !furnitures.length) return null;

  return (
    <Stack className="sale-banner-section" gap="40px">
      <Stack className="sale-header" gap="16px">
        <Box className="sale-info-box">
          <Box className="left">
            <span>
              <em>Sale</em> Opportunity — Don&apos;t Miss Out!
            </span>
            <p>Limited time deals on premium furniture</p>
          </Box>
          <div className="section-nav-arrows">
            <button
              className="section-arrow section-arrow--prev"
              onClick={scrollLeft}
              aria-label="Previous sale products"
            >
              ←
            </button>
            <button
              className="section-arrow section-arrow--next"
              onClick={scrollRight}
              aria-label="Next sale products"
            >
              →
            </button>
          </div>
        </Box>

        <Stack className="countdown-wrapper" gap="4px" alignItems="center">
          <Stack
            className="countdown-row"
            direction="row"
            alignItems="center"
            gap="14px"
          >
            {[
              { value: pad(timeLeft.days), label: "Days" },
              { value: pad(timeLeft.hours), label: "Hours" },
              { value: pad(timeLeft.mins), label: "Mins" },
              { value: pad(timeLeft.secs), label: "Secs" },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                <Box className="countdown-circle">
                  <Typography className="countdown-value">
                    {item.value}
                  </Typography>
                </Box>
                {i < 3 && (
                  <Typography className="countdown-colon">:</Typography>
                )}
              </React.Fragment>
            ))}
          </Stack>
          <Stack className="countdown-labels" direction="row" gap="32px">
            {["Days", "Hours", "Mins", "Secs"].map((label) => (
              <Typography key={label} className="countdown-label">
                {label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>

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

export default SaleBanner;
