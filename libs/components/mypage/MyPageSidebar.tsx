import { useState } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import { userVar } from "../../../apollo/store";
import { REACT_APP_API_URL } from "../../config";
import { logOut } from "../../auth";
import { MemberType } from "../../enums/member.enum";
import ChairOutlined from "@mui/icons-material/ChairOutlined";

const MyPageSidebar = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [accountExpanded, setAccountExpanded] = useState(true);
  const [shoppingExpanded, setShoppingExpanded] = useState(true);
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
          src={avatarSrc}
          alt="Profile"
        />
        <Box className="profile-info">
          <Typography className="profile-name">
            {user.memberFullName || user.memberNick || "User"}
          </Typography>
          <Box className="profile-phone-row">
            <LocalPhoneOutlined sx={{ fontSize: 16 }} />
            <Typography className="profile-phone">
              {user.memberPhone || "—"}
            </Typography>
          </Box>
          <Typography className="profile-member-type">
            {user.memberType || "USER"}
          </Typography>
        </Box>
      </Box>

      <Stack className="sidebar-nav">
        {/* Account Setting */}
        <Box className="nav-section">
          <Box
            className={`nav-item ${currentPath === "/mypage" || currentPath === "/mypage/payment-details" ? "active" : ""}`}
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
              {user.memberType !== MemberType.DESIGNER && (
                <Link
                  href="/mypage/payment-details"
                  className={`sub-item ${currentPath === "/mypage/payment-details" ? "active" : ""}`}
                >
                  Payment Details
                </Link>
              )}
            </Box>
          )}
        </Box>

        {/* Shopping — USER only */}
        {user.memberType !== MemberType.DESIGNER && (
          <Box className="nav-section">
            <Box
              className={`nav-item ${["/mypage/wishlist", "/mypage/cart", "/mypage/orders", "/mypage/coupons"].includes(currentPath) ? "active" : ""}`}
              onClick={() => setShoppingExpanded(!shoppingExpanded)}
            >
              <span className="nav-icon">
                <ShoppingCartOutlined />
              </span>
              Shopping
              <span className="nav-icon" style={{ marginLeft: "auto" }}>
                {shoppingExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
              </span>
            </Box>
            {shoppingExpanded && (
              <Box className="nav-sub-items">
                <Link
                  href="/mypage/wishlist"
                  className={`sub-item ${currentPath === "/mypage/wishlist" ? "active" : ""}`}
                >
                  My Wishlist
                </Link>
                <Link
                  href="/mypage/cart"
                  className={`sub-item ${currentPath === "/mypage/cart" ? "active" : ""}`}
                >
                  My Cart
                </Link>
                <Link
                  href="/mypage/orders"
                  className={`sub-item ${currentPath === "/mypage/orders" ? "active" : ""}`}
                >
                  My Orders
                </Link>
                <Link
                  href="/mypage/coupons"
                  className={`sub-item ${currentPath === "/mypage/coupons" ? "active" : ""}`}
                >
                  My Coupons
                </Link>
              </Box>
            )}
          </Box>
        )}

        {/* My Furnitures — DESIGNER only */}
        {user.memberType === MemberType.DESIGNER && (
          <Box className="nav-section">
            <Box
              className={`nav-item ${["/mypage/my-furnitures", "/mypage/add-furniture"].includes(currentPath) ? "active" : ""}`}
              onClick={() => setShoppingExpanded(!shoppingExpanded)}
            >
              <span className="nav-icon">
                <ChairOutlined />
              </span>
              My Furnitures
              <span className="nav-icon" style={{ marginLeft: "auto" }}>
                {shoppingExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
              </span>
            </Box>
            {shoppingExpanded && (
              <Box className="nav-sub-items">
                <Link
                  href="/mypage/my-furnitures"
                  className={`sub-item ${currentPath === "/mypage/my-furnitures" ? "active" : ""}`}
                >
                  My Furnitures
                </Link>
                <Link
                  href="/mypage/add-furniture"
                  className={`sub-item ${currentPath === "/mypage/add-furniture" ? "active" : ""}`}
                >
                  Add Furniture
                </Link>
              </Box>
            )}
          </Box>
        )}

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
                Recently Visited
              </Link>
              <Link
                href="/mypage/followers"
                className={`sub-item ${currentPath === "/mypage/followers" ? "active" : ""}`}
              >
                Followers
              </Link>
              <Link
                href="/mypage/followings"
                className={`sub-item ${currentPath === "/mypage/followings" ? "active" : ""}`}
              >
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
                My Articles
              </Link>
              <Link
                href="/mypage/write-article"
                className={`sub-item ${currentPath === "/mypage/write-article" ? "active" : ""}`}
              >
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
