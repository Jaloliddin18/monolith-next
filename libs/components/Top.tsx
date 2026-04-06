import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReactiveVar, useQuery } from "@apollo/client";
import { userVar } from "../../apollo/store";
import { getJwtToken, updateUserInfo, logOut } from "../auth";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import MiniCart from "./cart/MiniCart";
import MiniWishlist from "./cart/MiniWishlist";
import { getCartCount } from "../utils/cartStorage";
import { GET_FAVORITES } from "../../apollo/user/query";
import { T } from "../types/common";

const Top = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    update();
    window.addEventListener('cartUpdated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cartUpdated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const { data: favoritesData, refetch: refetchWishlistCount } = useQuery(GET_FAVORITES, {
    skip: !user?._id,
    variables: { input: { page: 1, limit: 1 } },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!user?._id) { setWishlistCount(0); return; }
    setWishlistCount((favoritesData as T)?.getFavorites?.metaCounter?.[0]?.total ?? 0);
  }, [favoritesData, user?._id]);

  useEffect(() => {
    if (!user?._id) return;
    const update = () => refetchWishlistCount();
    window.addEventListener('wishlistUpdated', update);
    return () => window.removeEventListener('wishlistUpdated', update);
  }, [user?._id, refetchWishlistCount]);

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
        {/* Navigation Links — left */}
        <Stack direction="row" className="nav-links" gap={3} sx={{ flex: 1 }}>
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
              className={`nav-dropdown ${router.pathname.includes("/about") || router.pathname.includes("/service") || router.pathname === "/cs/contact" ? "active" : ""}`}
            >
              <Link
                href="/about"
                className={`nav-dropdown-trigger ${router.pathname.includes("/about") || router.pathname.includes("/service") || router.pathname === "/cs/contact" ? "active" : ""}`}
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
            {/* <Link
              href="/mypage"
              className={router.pathname.includes("/mypage") ? "active" : ""}
            >
              My Page
            </Link> */}
            <Box
              className={`nav-dropdown ${router.pathname.startsWith("/cs") && router.pathname !== "/cs/contact" ? "active" : ""}`}
            >
              <Link
                href="/cs"
                className={`nav-dropdown-trigger ${router.pathname.startsWith("/cs") && router.pathname !== "/cs/contact" ? "active" : ""}`}
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

        {/* Logo — center */}
        <Link href="/" className="logo" style={{ padding: '0 48px' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '22px', fontWeight: 300, letterSpacing: '8px', color: '#1C1A17' }}>
            MONOLITH
          </span>
        </Link>

        {/* Search + Actions — right */}
        <Stack direction="row" alignItems="center" gap={2} sx={{ flex: 1, justifyContent: 'flex-end' }}>
          <Box className="search-box">
            <SearchIcon sx={{ fontSize: 20, color: "#999" }} />
            <input type="text" placeholder="search" />
          </Box>

          {user?._id ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  src={
                    user.memberImage && !user.memberImage.startsWith("/img/")
                      ? `${process.env.REACT_APP_API_URL}/${user.memberImage}`
                      : user.memberImage || "/icons/user_profile.png"
                  }
                  alt={user.memberNick}
                  sx={{ width: 36, height: 36 }}
                />
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
            <Box
              className="login-register-btn"
              onClick={() => router.push("/account/join")}
            >
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              <span>Login / Register</span>
            </Box>
          )}

          {user?._id && (
            <IconButton onClick={() => setOpenWishlist(true)}>
              <Badge badgeContent={wishlistCount} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          )}

          <IconButton onClick={() => setOpenCart(true)}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>

      {/* Mini Cart Sidebar */}
      <MiniCart open={openCart} onClose={() => setOpenCart(false)} />

      {/* Mini Wishlist Sidebar */}
      <MiniWishlist
        open={openWishlist}
        onClose={() => setOpenWishlist(false)}
      />
    </Stack>
  );
};

export default Top;
