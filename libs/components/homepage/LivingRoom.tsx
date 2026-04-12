import React, { useState, useRef } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

interface DotProduct {
  id: string;
  left: string;
  top: string;
  name: string;
  price: string;
}

const image1Products: DotProduct[] = [
  { id: "p1", left: "70%", top: "56%", name: "Accent Chair", price: "$ 189.99" },
  { id: "p2", left: "51%", top: "71%", name: "Coffee Table", price: "$ 129.50" },
  { id: "p3", left: "28%", top: "40%", name: "Wall Shelf", price: "$ 64.00" },
];

const image2Products: DotProduct[] = [
  { id: "p4", left: "35%", top: "62%", name: "Lounge Chair", price: "$ 32.10" },
  { id: "p5", left: "90%", top: "64%", name: "Side Table", price: "$ 75.00" },
  { id: "p6", left: "84%", top: "17%", name: "Floor Lamp", price: "$ 55.20" },
  { id: "p7", left: "55%", top: "45%", name: "Sofa Set", price: "$ 499.00" },
];

interface DotWithPopupProps {
  product: DotProduct;
  onShop: () => void;
}

const DotWithPopup = ({ product, onShop }: DotWithPopupProps) => {
  const [status, setStatus] = useState<"hidden" | "visible" | "fading">("hidden");
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topPct = parseFloat(product.top);
  const isAboveDot = topPct > 40;

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setStatus("visible");
  };

  const handleLeave = () => {
    // grace period so crossing the gap to the popup doesn't dismiss it
    leaveTimer.current = setTimeout(() => {
      setStatus("fading");
      hideTimer.current = setTimeout(() => setStatus("hidden"), 800);
    }, 150);
  };

  const popupStyle: React.CSSProperties = {
    left: "50%",
    transform: "translateX(-50%)",
    ...(isAboveDot
      ? { bottom: "20px", top: "auto" }
      : { top: "20px", bottom: "auto" }),
  };

  return (
    <Box
      sx={{ position: "absolute", left: product.left, top: product.top }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Box
        className="living-dot"
        sx={{ left: 0, top: 0, transform: "translate(-50%, -50%)" }}
      />
      {status !== "hidden" && (
        <Stack
          className={`living-product-popup ${status === "visible" ? "popup-visible" : "popup-fading"}`}
          style={popupStyle}
          alignItems="center"
          gap="12px"
        >
          <Typography className="popup-name">{product.name}</Typography>
          <Typography className="popup-price">{product.price}</Typography>
          <Button
            className="btn-buy-now"
            variant="contained"
            onClick={onShop}
            sx={{ whiteSpace: "nowrap" }}
          >
            SHOP NOW
          </Button>
          <Box
            className={`popup-arrow ${isAboveDot ? "popup-arrow-down" : "popup-arrow-up"}`}
          />
        </Stack>
      )}
    </Box>
  );
};

const LivingRoom = () => {
  const router = useRouter();
  const goToShop = () => router.push("/furniture");

  return (
    <Stack className="living-room-section" alignItems="center" gap="50px">
      <Typography className="section-title-text">
        Living Room Furniture to Suit Your Lifestyle
      </Typography>
      <Stack direction="row" gap="24px">
        <Box className="living-room-image">
          <img src="/img/homepage/home8.webp" alt="Living Room 1" />
          {image1Products.map((p) => (
            <DotWithPopup key={p.id} product={p} onShop={goToShop} />
          ))}
        </Box>
        <Box className="living-room-image">
          <img src="/img/homepage/home11.jpg" alt="Living Room 2" />
          {image2Products.map((p) => (
            <DotWithPopup key={p.id} product={p} onShop={goToShop} />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default LivingRoom;
