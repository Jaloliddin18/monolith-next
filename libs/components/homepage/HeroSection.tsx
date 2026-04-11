import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useTranslation } from "next-i18next";

const HeroSection = () => {
  const { t } = useTranslation("common");

  return (
    <Box className="hero-section">
      <Box className="hero-bg" />
      <Stack className="hero-container" direction="row" alignItems="center">
        <Stack className="hero-left">
          <Stack className="hero-text-block">
            <Typography className="hero-title">{t("heroTitle")}</Typography>
            <Typography className="hero-subtitle">
              {t("heroSubtitle")}
            </Typography>
          </Stack>
          <Stack className="hero-cta" direction="row" alignItems="center">
            <Typography className="hero-price">$139.99</Typography>
            <Button className="btn-hero-cta" disableElevation>
              {t("ADD TO CART")}
            </Button>
          </Stack>
        </Stack>
        <Box className="hero-right">
          <img src="/img/homepage/home12.webp" alt="Featured Chair" />
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection;
