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
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import PersonAddAlt1Outlined from "@mui/icons-material/PersonAddAlt1Outlined";
import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import EditNoteOutlined from "@mui/icons-material/EditNoteOutlined";
import { userVar } from "../../../apollo/store";
import { REACT_APP_API_URL } from "../../config";
import { logOut } from "../../auth";

const MyPageSidebar = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [accountExpanded, setAccountExpanded] = useState(true);
  const [activityExpanded, setActivityExpanded] = useState(true);
  const [communityExpanded, setCommunityExpanded] = useState(true);

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
          src={"/icons/user_profile.png"}
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

        {/* Activity */}
        <Box className="nav-section">
          <Box
            className={`nav-item ${["/mypage/visited", "/mypage/followers", "/mypage/followings"].includes(currentPath) ? "active" : ""}`}
            onClick={() => setActivityExpanded(!activityExpanded)}
          >
            <span className="nav-icon">
              <ManageSearchOutlined />
            </span>
            Activity
            <span className="nav-icon" style={{ marginLeft: "auto" }}>
              {activityExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
            </span>
          </Box>
          {activityExpanded && (
            <Box className="nav-sub-items">
              <Link
                href="/mypage/visited"
                className={`sub-item ${currentPath === "/mypage/visited" ? "active" : ""}`}
              >
                <ManageSearchOutlined fontSize="small" />
                Recently Visited
              </Link>
              <Link
                href="/mypage/followers"
                className={`sub-item ${currentPath === "/mypage/followers" ? "active" : ""}`}
              >
                <PeopleOutlined fontSize="small" />
                Followers
              </Link>
              <Link
                href="/mypage/followings"
                className={`sub-item ${currentPath === "/mypage/followings" ? "active" : ""}`}
              >
                <PersonAddAlt1Outlined fontSize="small" />
                Followings
              </Link>
            </Box>
          )}
        </Box>

        {/* Community */}
        <Box className="nav-section">
          <Box
            className={`nav-item ${["/mypage/articles", "/mypage/write-article"].includes(currentPath) ? "active" : ""}`}
            onClick={() => setCommunityExpanded(!communityExpanded)}
          >
            <span className="nav-icon">
              <ArticleOutlined />
            </span>
            Community
            <span className="nav-icon" style={{ marginLeft: "auto" }}>
              {communityExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
            </span>
          </Box>
          {communityExpanded && (
            <Box className="nav-sub-items">
              <Link
                href="/mypage/articles"
                className={`sub-item ${currentPath === "/mypage/articles" ? "active" : ""}`}
              >
                <ArticleOutlined fontSize="small" />
                My Articles
              </Link>
              <Link
                href="/mypage/write-article"
                className={`sub-item ${currentPath === "/mypage/write-article" ? "active" : ""}`}
              >
                <EditNoteOutlined fontSize="small" />
                Write Article
              </Link>
            </Box>
          )}
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
