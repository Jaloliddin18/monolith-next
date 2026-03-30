import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";
import { getJwtToken, updateUserInfo, logOut } from "../auth";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import MiniCart from "./cart/MiniCart";

const Top = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const token = getJwtToken();
    if (token) updateUserInfo(token);
  }, []);

  const handleMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    logOut();
    handleMenuClose();
  }, []);

  return (
    <Stack id="top">
      {/* Top Banner */}
      <Box className="top-banner">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            Enjoy <span className="highlight">30% Off</span> Everything - Shop
            Now and Save Big!
          </Typography>
        </Stack>
      </Box>

      {/* Main Navbar */}
      <Stack
        className="navbar"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" gap={4}>
          {/* Logo */}
          <Link href="/" className="logo">
            <img
              src="/icons/Frame.svg"
              alt="StyleCasa"
              width={50}
              height={50}
            />
          </Link>

          {/* Navigation Links */}
          <Stack direction="row" className="nav-links" gap={3}>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>
              Home
            </Link>
            <Link
              href="/furniture"
              className={router.pathname.includes("/furniture") ? "active" : ""}
            >
              Shop
            </Link>
            <Link
              href="/designers"
              className={router.pathname.includes("/designers") ? "active" : ""}
            >
              Designers
            </Link>
            <Link
              href="/community"
              className={router.pathname.includes("/community") ? "active" : ""}
            >
              Blog
            </Link>
            <Box
              className={`nav-dropdown ${router.pathname.includes("/about") || router.pathname.includes("/service") ? "active" : ""}`}
            >
              <Link
                href="/about"
                className={`nav-dropdown-trigger ${router.pathname.includes("/about") || router.pathname.includes("/service") ? "active" : ""}`}
              >
                About
              </Link>
              <Box className="nav-dropdown-menu">
                <Link href="/about" className="dropdown-item">
                  About
                </Link>
                <Link href="/cs/contact" className="dropdown-item">
                  Contact Us
                </Link>
              </Box>
            </Box>
            <Link
              href="/mypage"
              className={router.pathname.includes("/mypage") ? "active" : ""}
            >
              My Page
            </Link>
            <Box
              className={`nav-dropdown ${router.pathname.includes("/cs") ? "active" : ""}`}
            >
              <Link
                href="/cs"
                className={`nav-dropdown-trigger ${router.pathname.includes("/cs") ? "active" : ""}`}
              >
                CS
              </Link>
              <Box className="nav-dropdown-menu">
                <Link href="/cs" className="dropdown-item">
                  Customer Service
                </Link>
                <Link href="/cs/faq" className="dropdown-item">
                  FAQ
                </Link>
                <Link href="/cs/terms" className="dropdown-item">
                  Terms & Conditions
                </Link>
                <Link href="/cs/privacy" className="dropdown-item">
                  Privacy Policy
                </Link>
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* Search + Actions */}
        <Stack direction="row" alignItems="center" gap={2}>
          <Box className="search-box">
            <SearchIcon sx={{ fontSize: 20, color: "#999" }} />
            <input type="text" placeholder="search" />
          </Box>

          {user?._id ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <PersonOutlineIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/mypage");
                    handleMenuClose();
                  }}
                >
                  My Page
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => router.push("/account/join")}>
              <PersonOutlineIcon />
            </IconButton>
          )}

          <IconButton>
            <Badge badgeContent={0} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={() => setOpenCart(true)}>
            <Badge badgeContent={3} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>

      {/* Mini Cart Sidebar */}
      <MiniCart open={openCart} onClose={() => setOpenCart(false)} />
    </Stack>
  );
};

export default Top;
