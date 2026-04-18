import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Furniture } from "../../types/furniture/furniture";
import ProductCard from "../common/ProductCard";

interface SaleBannerProps {
  furnitures: Furniture[];
  onLike: (id: string) => void;
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

const SaleBanner = ({ furnitures, onLike }: SaleBannerProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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

  if (!furnitures.length) return null;

  return (
    <Stack className="sale-banner-section" gap="40px">
      <Stack className="sale-header" gap="16px">
        {/* Row 1: title left | arrows right */}
        <Box className="sale-info-box">
          <Box className="left">
            <span>
              <em>Sale</em> Opportunity — Don&apos;t Miss Out!
            </span>
            <p>Limited time deals on premium furniture</p>
          </Box>
          <Box className="homepage-swiper-nav">
            <button
              ref={prevRef}
              type="button"
              className="homepage-swiper-btn"
              aria-label="Previous sale products"
            >
              <WestIcon sx={{ fontSize: 16 }} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className="homepage-swiper-btn"
              aria-label="Next sale products"
            >
              <EastIcon sx={{ fontSize: 16 }} />
            </button>
          </Box>
        </Box>

        {/* Row 2: countdown centered */}
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

      <Box className="section-swiper-wrap">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
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
              <ProductCard furniture={furniture} onLike={onLike} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default SaleBanner;
