import React from "react";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack id="footer">
      <Box className="footer-main">
        {/* Top Row: Brand + Links + Mobile + Social */}
        <Stack
          className="footer-top-row"
          direction="row"
          justifyContent="space-between"
        >
          {/* Left Column: Logo + Guarantee texts */}
          <Stack className="footer-brand-col">
            <Stack className="footer-logo" direction="row" alignItems="center">
              <Typography
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "22px",
                  fontWeight: 300,
                  letterSpacing: "6px",
                  color: "#1C1A17",
                }}
              >
                MONOLITH
              </Typography>
            </Stack>
            <Stack className="footer-guarantee-texts" gap="24px">
              <Stack direction="row" alignItems="center" gap="24px">
                <img
                  src="/icons/support 1.svg"
                  alt="Guarantee"
                  width={50}
                  height={50}
                />
                <Typography className="footer-guarantee-text">
                  Our 100% Guarantee for All Products at{" "}
                  <span className="highlight">monolith.com</span>
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="24px">
                <img
                  src="/icons/return 1.svg"
                  alt="Return"
                  width={50}
                  height={50}
                />
                <Typography className="footer-guarantee-text">
                  Enjoy a 14-Day Window to Return Your Order at MONOLITH
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* About Us Column */}
          <Stack className="footer-link-col">
            <Typography className="footer-col-title">About Us</Typography>
            <Stack className="footer-col-links">
              <Link href="/service" className="active-link">
                Services
              </Link>
              <Link href="/about">Company</Link>
              <Link href="/about">Quality</Link>
              <Link href="/furniture">Find Shop</Link>
              <Link href="/about">Careers</Link>
            </Stack>
          </Stack>

          {/* Get Help Column */}
          <Stack className="footer-link-col">
            <Typography className="footer-col-title">Get help</Typography>
            <Stack className="footer-col-links">
              <Link href="/cs">Payment</Link>
              <Link href="/cs">FAQ</Link>
              <Link href="/cs">Shipping</Link>
              <Link href="/cs">Contact us</Link>
              <Link href="/cs">Privacy policy</Link>
            </Stack>
          </Stack>

          {/* Order & Purchase Column */}
          <Stack className="footer-link-col">
            <Typography className="footer-col-title">
              Order &amp; Purchase
            </Typography>
            <Stack className="footer-col-links">
              <Link href="/cs">Payment</Link>
              <Link href="/cs">Order status</Link>
              <Link href="/cs">Return &amp; exchange</Link>
              <Link href="/cs">Wishlist</Link>
              <Link href="/cs">Shipping</Link>
            </Stack>
          </Stack>

          {/* Get on Mobile + Social */}
          <Stack className="footer-mobile-col">
            <Stack className="footer-mobile-section">
              <Typography className="footer-col-title">
                Get on mobile
              </Typography>
              <Stack className="footer-app-links" gap="12px">
                <img
                  src="/icons/Google play store.svg"
                  alt="Google Play"
                  className="app-badge"
                />
                <img
                  src="/icons/apple_store.svg"
                  alt="App Store"
                  className="app-badge"
                />
              </Stack>
            </Stack>
            <Stack
              className="footer-social-icons"
              direction="row"
              gap="12px"
              alignItems="center"
            >
              <img
                src="/icons/FacebookLogo.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <img
                src="/icons/YoutubeLogo.svg"
                alt="YouTube"
                width={24}
                height={24}
              />
              <img
                src="/icons/InstagramLogo.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
              <img
                src="/icons/TwitterLogo.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Bottom Row: Copyright + Payment */}
        <Stack
          className="footer-bottom-row"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap="8px">
            <Typography className="footer-copyright">
              © <span className="highlight">MONOLITH </span>
              2023 All right reserved.
            </Typography>
          </Stack>
          <Stack
            className="footer-payment-logos"
            direction="row"
            alignItems="center"
            gap="24px"
          >
            <img src="/img/payment_logo/world_pay.png" alt="WorldPay" />
            <img src="/img/payment_logo/amazon_logo.png" alt="Amazon" />
            <img src="/img/payment_logo/pay_pal.png" alt="PayPal" />
            <img src="/img/payment_logo/visa_pay.png" alt="VISA" />
            <img src="/img/payment_logo/master_card.png" alt="MasterCard" />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Footer;
