import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

const LivingRoom = () => {
  return (
    <Stack className="living-room-section" alignItems="center" gap="50px">
      <Typography className="section-title-text">
        Living Room Furniture to Suit Your Lifestyle
      </Typography>
      <Stack direction="row" gap="24px">
        <Box className="living-room-image">
          <img src="/img/homepage/home8.webp" alt="Living Room 1" />
          <Box className="living-dot" sx={{ left: "70%", top: "56%" }} />
          <Box className="living-dot" sx={{ left: "51%", top: "71%" }} />
        </Box>
        <Box className="living-room-image">
          <img src="/img/homepage/home11.jpg" alt="Living Room 2" />
          <Box className="living-dot" sx={{ left: "35%", top: "62%" }} />
          <Box className="living-dot" sx={{ left: "90%", top: "64%" }} />
          <Box className="living-dot" sx={{ left: "84%", top: "17%" }} />
          {/* Product popup tooltip */}
          <Stack
            className="living-product-popup"
            alignItems="center"
            gap="24px"
          >
            <Stack alignItems="center" gap="12px">
              <Typography className="popup-name">Lounge Chair</Typography>
              <Typography className="popup-price">$ 32.10</Typography>
            </Stack>
            <Button className="btn-buy-now" variant="contained">
              BUY NOW
            </Button>
            <Box className="popup-arrow" />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LivingRoom;
