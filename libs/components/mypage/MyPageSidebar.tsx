import { useState } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";
import { userVar } from "../../../apollo/store";
import { REACT_APP_API_URL } from "../../config";
import { logOut } from "../../auth";

const MyPageSidebar = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [accountExpanded, setAccountExpanded] = useState(true);

  const currentPath = router.asPath;

  const avatarSrc = user.memberImage
    ? user.memberImage.startsWith("/img") ||
      user.memberImage.startsWith("/icons")
      ? user.memberImage
      : `${REACT_APP_API_URL}/${user.memberImage}`
    : "/icons/user_profile.png";

  return (
    <Stack className="mypage-sidebar">
      <Box className="sidebar-profile">
        <img
          className="profile-avatar"
          src={avatarSrc}
          alt="Profile"
        />
        <Box className="profile-info">
          <Typography className="profile-name">
            {user.memberNick || "User"}
          </Typography>
          <Typography className="profile-location">
            {user.memberAddress || "No address"}
          </Typography>
        </Box>
      </Box>

      <Stack className="sidebar-nav">
        {/* Account Setting */}
        <Box className="nav-section">
          <Box
            className={`nav-item ${currentPath === "/mypage" || currentPath === "/mypage/manage-address" || currentPath === "/mypage/payment-details" ? "active" : ""}`}
            onClick={() => setAccountExpanded(!accountExpanded)}
          >
            <span className="nav-icon">
              <SettingsOutlined />
            </span>
            Account Setting
            <span className="nav-icon" style={{ marginLeft: "auto" }}>
              {accountExpanded ? (
                <ExpandLessOutlined />
              ) : (
                <ExpandMoreOutlined />
              )}
            </span>
          </Box>
          {accountExpanded && (
            <Box className="nav-sub-items">
              <Link
                href="/mypage"
                className={`sub-item ${currentPath === "/mypage" ? "active" : ""}`}
              >
                Personal Info
              </Link>
              <Link
                href="/mypage/manage-address"
                className={`sub-item ${currentPath === "/mypage/manage-address" ? "active" : ""}`}
              >
                Manage Address
              </Link>
              <Link
                href="/mypage/payment-details"
                className={`sub-item ${currentPath === "/mypage/payment-details" ? "active" : ""}`}
              >
                Payment Details
              </Link>
            </Box>
          )}
        </Box>

        {/* Wishlist */}
        <Box className="nav-section">
          <Link
            href="/mypage/wishlist"
            className={`nav-item ${currentPath === "/mypage/wishlist" ? "active" : ""}`}
          >
            <span className="nav-icon">
              <FavoriteBorderOutlined />
            </span>
            My Wishlist
          </Link>
        </Box>

        {/* Cart */}
        <Box className="nav-section">
          <Link
            href="/mypage/cart"
            className={`nav-item ${currentPath === "/mypage/cart" ? "active" : ""}`}
          >
            <span className="nav-icon">
              <ShoppingCartOutlined />
            </span>
            My Cart
          </Link>
        </Box>

        {/* Orders */}
        <Box className="nav-section">
          <Link
            href="/mypage/orders"
            className={`nav-item ${currentPath === "/mypage/orders" ? "active" : ""}`}
          >
            <span className="nav-icon">
              <Inventory2Outlined />
            </span>
            My Orders
          </Link>
        </Box>

        {/* Coupons */}
        <Box className="nav-section">
          <Link
            href="/mypage/coupons"
            className={`nav-item ${currentPath === "/mypage/coupons" ? "active" : ""}`}
          >
            <span className="nav-icon">
              <LocalOfferOutlined />
            </span>
            My Coupons
          </Link>
        </Box>

        {/* Footer links */}
        <Box className="nav-footer">
          <Link href="/service" className="footer-link">
            Service
          </Link>
          <Link href="/cs" className="footer-link">
            Help
          </Link>
        </Box>

        {/* Logout */}
        <Box className="nav-logout">
          <button className="logout-btn" onClick={logOut}>
            <span className="nav-icon">
              <PowerSettingsNewOutlined />
            </span>
            Log out
          </button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default MyPageSidebar;
