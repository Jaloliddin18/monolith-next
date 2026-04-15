import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const NewestChair = () => {
  const router = useRouter();
  return (
    <Stack className="newest-section" gap="24px">
      <Stack direction="row" gap="24px">
        <Box className="newest-card newest-card-warm">
          <Stack className="newest-card-text" gap="8px">
            <Typography className="newest-card-label">Newest Chair</Typography>
            <Typography className="newest-card-title">
              Freshen Up Your Seating
            </Typography>
          </Stack>
          <Box className="newest-card-image">
            <img src="/img/homepage/home2.webp" alt="Newest Chair" />
          </Box>
        </Box>
        <Box className="newest-card newest-card-gray">
          <Stack className="newest-card-text" gap="8px">
            <Stack direction="row" gap="12px" alignItems="center">
              <Typography className="newest-card-label">
                New arrivals
              </Typography>
              <Typography className="newest-card-discount">20% off</Typography>
            </Stack>
            <Typography className="newest-card-title">
              Modern Swivel Accent Chair
            </Typography>
          </Stack>
          <Box className="newest-card-heart">
            <img src="/icons/Heart.svg" alt="Wishlist" width={24} height={24} />
          </Box>
          <Box className="newest-card-image">
            <img src="/img/homepage/home6.jpg" alt="Modern Chair" />
          </Box>
        </Box>
      </Stack>
      <Box className="newest-banner">
        <Stack className="newest-banner-content" gap="50px">
          <Stack className="newest-banner-text" gap="8px">
            <Stack direction="row" gap="12px" alignItems="center">
              <Typography className="newest-card-label">
                Trendsetting Designs
              </Typography>
              <Typography className="newest-banner-seller">
                Best seller
              </Typography>
            </Stack>
            <Typography className="newest-card-title">
              Upgrade Your Seating Game
            </Typography>
          </Stack>
          <Button
            className="btn-shop-now"
            disableElevation
            onClick={() => router.push("/furniture")}
          >
            SHOP NOW
          </Button>
        </Stack>
        <Box className="newest-banner-image">
          <img src="/img/homepage/home7.webp" alt="Best Seller" />
        </Box>
      </Box>
    </Stack>
  );
};

export default NewestChair;
