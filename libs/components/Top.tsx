import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReactiveVar, useQuery, useLazyQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MiniCart from "./cart/MiniCart";
import MiniWishlist from "./cart/MiniWishlist";
import { getCartCount } from "../utils/cartStorage";
import { GET_FAVORITES, GET_FURNITURES } from "../../apollo/user/query";
import { T } from "../types/common";
import { Furniture } from "../types/furniture/furniture";
import { REACT_APP_API_URL } from "../config";

const Top = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const { t, i18n } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [lang, setLang] = useState<string>("en");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchFurnitures, { data: furnitureData, loading: isSearching }] = useLazyQuery(GET_FURNITURES, {
    fetchPolicy: "network-only",
  });

  const furnitures: Furniture[] = (furnitureData as T)?.getFurnitures?.list ?? [];
  const hasResults = furnitures.length > 0;

  useEffect(() => {
    const saved = localStorage.getItem("locale") ?? "en";
    setLang(saved);
  }, [router]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else {
      setSearchText("");
      setShowDropdown(false);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length < 2) {
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const text = val.trim();
      setShowDropdown(true);
      searchFurnitures({ variables: { input: { page: 1, limit: 5, search: { text } } } });
    }, 300);
  }, [searchFurnitures]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
    if (e.key === "Enter" && searchText.trim()) {
      const input = JSON.stringify({ page: 1, limit: 12, search: { text: searchText.trim() } });
      router.push(`/furniture?input=${input}`);
      setSearchOpen(false);
    }
  }, [searchText, router]);

  const handleResultClick = useCallback((href: string) => {
    router.push(href);
    setSearchOpen(false);
  }, [router]);

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    update();
    window.addEventListener("cartUpdated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cartUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const { data: favoritesData, refetch: refetchWishlistCount } = useQuery(GET_FAVORITES, {
    skip: !user?._id,
    variables: { input: { page: 1, limit: 1 } },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!user?._id) { setWishlistCount(0); return; }
    setWishlistCount((favoritesData as T)?.getFavorites?.metaCounter?.[0]?.total ?? 0);
  }, [favoritesData, user?._id]);

  useEffect(() => {
    if (!user?._id) return;
    const update = () => refetchWishlistCount();
    window.addEventListener("wishlistUpdated", update);
    return () => window.removeEventListener("wishlistUpdated", update);
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

  const handleLangOpen = (e: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(e.currentTarget);
  };

  const handleLangClose = () => {
    setLangAnchorEl(null);
  };

  const handleLangChoice = useCallback(
    async (locale: string) => {
      setLang(locale);
      localStorage.setItem("locale", locale);
      setLangAnchorEl(null);
      await router.push(router.asPath, router.asPath, { locale });
    },
    [router],
  );

  return (
    <Stack id="top">
      {/* Top Banner */}
      <Box className="top-banner">
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            {t("topBanner")}
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
            {t("Home")}
          </Link>
          <Link href="/furniture" className={router.pathname.includes("/furniture") ? "active" : ""}>
            {t("Shop")}
          </Link>
          <Link href="/designers" className={router.pathname.includes("/designers") ? "active" : ""}>
            {t("Designers")}
          </Link>
          <Link href="/community" className={router.pathname.includes("/community") ? "active" : ""}>
            {t("Blog")}
          </Link>
          <Box
            className={`nav-dropdown ${router.pathname.includes("/about") || router.pathname === "/cs/contact" ? "active" : ""}`}
          >
            <Link
              href="/about"
              className={`nav-dropdown-trigger ${router.pathname.includes("/about") || router.pathname === "/cs/contact" ? "active" : ""}`}
            >
              {t("About")}
            </Link>
            <Box className="nav-dropdown-menu">
              <Link href="/about" className="dropdown-item">{t("About")}</Link>
              <Link href="/cs/contact" className="dropdown-item">{t("Contact Us")}</Link>
            </Box>
          </Box>
          <Box
            className={`nav-dropdown ${router.pathname.startsWith("/cs") && router.pathname !== "/cs/contact" ? "active" : ""}`}
          >
            <Link
              href="/cs"
              className={`nav-dropdown-trigger ${router.pathname.startsWith("/cs") && router.pathname !== "/cs/contact" ? "active" : ""}`}
            >
              {t("CS")}
            </Link>
            <Box className="nav-dropdown-menu">
              <Link href="/cs" className="dropdown-item">{t("Customer Service")}</Link>
              <Link href="/cs/faq" className="dropdown-item">{t("FAQ")}</Link>
              <Link href="/cs/terms" className="dropdown-item">{t("Terms & Conditions")}</Link>
              <Link href="/cs/privacy" className="dropdown-item">{t("Privacy Policy")}</Link>
            </Box>
          </Box>
        </Stack>

        {/* Logo — center */}
        <Link href="/" className="logo" style={{ padding: "0 48px" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "22px", fontWeight: 300, letterSpacing: "8px", color: "#1C1A17" }}>
            MONOLITH
          </span>
        </Link>

        {/* Search + Actions — right */}
        <Stack direction="row" alignItems="center" gap={2} sx={{ flex: 1, justifyContent: "flex-end" }}>
          <Box
            ref={searchRef}
            className={`search-box${searchOpen ? " open" : ""}`}
            onClick={() => !searchOpen && setSearchOpen(true)}
          >
            <SearchIcon className="search-icon" sx={{ fontSize: 20 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("search")}
              value={searchText}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyDown}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Search Results Dropdown */}
            {searchOpen && showDropdown && (
              <Box className="search-dropdown">
                {isSearching && !hasResults && (
                  <Box className="search-dropdown-loading">
                    <Typography className="search-loading-text">Searching...</Typography>
                  </Box>
                )}

                {!isSearching && !hasResults && (
                  <Box className="search-dropdown-empty">
                    <Typography className="search-empty-text">No results for "{searchText}"</Typography>
                  </Box>
                )}

                {furnitures.map((item) => (
                  <Box
                    key={item._id}
                    className="search-result-item"
                    onClick={() => handleResultClick(`/furniture/${item._id}`)}
                  >
                    <Box
                      className="search-result-thumb"
                      sx={{
                        backgroundImage: item.furnitureImages?.[0]
                          ? `url(${REACT_APP_API_URL}/${item.furnitureImages[0]})`
                          : "url(/img/furniture/luxury_chair.jpg)",
                      }}
                    />
                    <Box className="search-result-info">
                      <Typography className="search-result-title">{item.furnitureTitle}</Typography>
                      <Typography className="search-result-sub">
                        ${item.furniturePrice?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {hasResults && (
                  <Box
                    className="search-see-all"
                    onClick={() => handleResultClick(`/furniture?input=${JSON.stringify({ page: 1, limit: 12, search: { text: searchText.trim() } })}`)}
                  >
                    <Typography className="search-see-all-text">
                      See all results for "{searchText}"
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
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
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { router.push("/mypage"); handleMenuClose(); }}>
                  {t("My Page")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{t("Logout")}</MenuItem>
              </Menu>
            </>
          ) : (
            <Box className="login-register-btn" onClick={() => router.push("/account/join")}>
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              <span>{t("Login / Register")}</span>
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

          {/* Language Switcher */}
          <Box
            className="lang-switcher"
            onClick={handleLangOpen}
            sx={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", ml: 0.5 }}
          >
            <img
              src={`/img/flag/lang${lang}.png`}
              alt={lang}
              style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 2 }}
            />
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#616161" }} />
          </Box>
          <Menu
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={handleLangClose}
            sx={{ mt: "4px" }}
          >
            <MenuItem onClick={() => handleLangChoice("en")} sx={{ gap: "10px" }}>
              <img src="/img/flag/langen.png" alt="English" style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 2 }} />
              {t("English")}
            </MenuItem>
            <MenuItem onClick={() => handleLangChoice("kr")} sx={{ gap: "10px" }}>
              <img src="/img/flag/langkr.png" alt="Korean" style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 2 }} />
              {t("Korean")}
            </MenuItem>
            <MenuItem onClick={() => handleLangChoice("ru")} sx={{ gap: "10px" }}>
              <img src="/img/flag/langru.png" alt="Russian" style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 2 }} />
              {t("Russian")}
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>

      {/* Mini Cart Sidebar */}
      <MiniCart open={openCart} onClose={() => setOpenCart(false)} />

      {/* Mini Wishlist Sidebar */}
      <MiniWishlist open={openWishlist} onClose={() => setOpenWishlist(false)} />
    </Stack>
  );
};

export default Top;
