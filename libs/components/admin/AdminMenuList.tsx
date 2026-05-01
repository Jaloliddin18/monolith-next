import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Avatar, Typography, Divider, Tooltip } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { REACT_APP_API_URL } from "../../config";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  children?: { title: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon sx={{ fontSize: 18 }} />,
    href: "/_admin",
  },
  {
    title: "Members",
    icon: <PeopleOutlineIcon sx={{ fontSize: 18 }} />,
    href: "/_admin/users",
  },
  {
    title: "Furniture",
    icon: <ChairOutlinedIcon sx={{ fontSize: 18 }} />,
    href: "/_admin/furnitures",
  },
  {
    title: "Articles",
    icon: <ArticleOutlinedIcon sx={{ fontSize: 18 }} />,
    href: "/_admin/community",
  },
  {
    title: "CS",
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 18 }} />,
    children: [
      { title: "Announcements", href: "/_admin/cs/notice" },
      { title: "1:1 Inqury", href: "/_admin/cs/inquiry" },
    ],
  },
];

const AdminMenuList = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const avatarSrc =
    user.memberImage && !user.memberImage.startsWith("/icons")
      ? `${REACT_APP_API_URL}/${user.memberImage}`
      : "/general_images/default_profile.png";

  useEffect(() => {
    // Auto-expand CS menu when on cs pages
    if (router.pathname.includes("/_admin/cs")) {
      setExpandedItem("CS");
    }
  }, [router.pathname]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/_admin") return router.pathname === "/_admin";
    return router.pathname.startsWith(href);
  };

  const isChildActive = (children?: { href: string }[]) =>
    children?.some((c) => router.pathname.startsWith(c.href)) ?? false;

  return (
    <Box className="admin-sidebar">
      {/* Logo */}
      <Box className="admin-sidebar-logo">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography className="admin-logo-text">MONOLITH</Typography>
        </Link>
        <Typography className="admin-logo-sub">Admin Console</Typography>
      </Box>

      <Box className="admin-sidebar-divider" />

      {/* Navigation */}
      <Box className="admin-nav" sx={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.href
            ? isActive(item.href)
            : isChildActive(item.children);
          const expanded =
            expandedItem === item.title || isChildActive(item.children);

          if (item.children) {
            return (
              <Box key={item.title}>
                <Box
                  className={`admin-nav-item${active ? " active" : ""}`}
                  onClick={() => setExpandedItem(expanded ? null : item.title)}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  <span className="admin-nav-label">{item.title}</span>
                  <span
                    className="admin-nav-chevron"
                    style={{
                      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 16 }} />
                  </span>
                </Box>
                {expanded && (
                  <Box className="admin-subnav">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          className={`admin-subnav-item${
                            router.pathname === child.href ? " active" : ""
                          }`}
                        >
                          {child.title}
                        </Box>
                      </Link>
                    ))}
                  </Box>
                )}
              </Box>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href!}
              style={{ textDecoration: "none" }}
            >
              <Box className={`admin-nav-item${active ? " active" : ""}`}>
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.title}</span>
              </Box>
            </Link>
          );
        })}
      </Box>

      <Box className="admin-sidebar-divider" />

      {/* Admin profile at bottom */}
      <Box className="admin-sidebar-profile">
        <Avatar src={avatarSrc} sx={{ width: 34, height: 34, flexShrink: 0 }} />
        <Box className="admin-profile-text">
          <Typography className="admin-profile-name">
            {user.memberNick || "Admin"}
          </Typography>
          <Typography className="admin-profile-role">Administrator</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMenuList;
