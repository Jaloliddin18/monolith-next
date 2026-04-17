import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const AdminMenuList = (props: any) => {
  const router = useRouter();
  const device = useDeviceDetect();
  const [openMenu, setOpenMenu] = useState(
    typeof window === "object"
      ? localStorage.getItem("admin_menu") === "true"
      : false,
  );
  const [clickMenu, setClickMenu] = useState<any>([]);
  const [clickSubMenu, setClickSubMenu] = useState("");

  const pathnames = router.pathname.split("/").filter((x: any) => x);

  /** LIFECYCLES **/
  useEffect(() => {
    switch (pathnames[1]) {
      case "properties":
        setClickMenu(["Furnitures"]);
        break;
      case "community":
        setClickMenu(["Community"]);
        break;
      case "cs":
        setClickMenu(["CS"]);
        break;
      default:
        setClickMenu(["Users"]);
        break;
    }

    switch (pathnames[2]) {
      case "inquiry":
        setClickSubMenu("1:1 Inquiry");
        break;
      case "notice":
        setClickSubMenu("Notice");
        break;
      case "faq":
        setClickSubMenu("FAQ");
        break;
      default:
        setClickSubMenu("List");
        break;
    }
    // Also auto-open Cs menu when on CS pages
    if (pathnames[1] === "cs") {
      setClickMenu(["CS"]);
    }
  }, []);

  /** HANDLERS **/
  const subMenuChangeHandler = (target: string) => {
    if (clickMenu.find((item: string) => item === target)) {
      setClickMenu(clickMenu.filter((menu: string) => target !== menu));
    } else {
      setClickMenu([...clickMenu, target]);
    }
  };

  const menu_set = [
    {
      title: "Users",
      icon: <PersonOutlineIcon sx={{ fontSize: 20, color: "#bdbdbd" }} />,
      on_click: () => subMenuChangeHandler("Users"),
    },
    {
      title: "Furnitures",
      icon: (
        <ManageAccountsOutlinedIcon sx={{ fontSize: 20, color: "#bdbdbd" }} />
      ),
      on_click: () => subMenuChangeHandler("Furnitures"),
    },
    {
      title: "Community",
      icon: <ForumOutlinedIcon sx={{ fontSize: 20, color: "#bdbdbd" }} />,
      on_click: () => subMenuChangeHandler("Community"),
    },
    {
      title: "CS",
      icon: <HeadsetMicOutlinedIcon sx={{ fontSize: 20, color: "#bdbdbd" }} />,
      on_click: () => subMenuChangeHandler("CS"),
    },
  ];

  const sub_menu_set: any = {
    Users: [{ title: "List", url: "/_admin/users" }],
    Furnitures: [{ title: "List", url: "/_admin/properties" }],
    Community: [{ title: "List", url: "/_admin/community" }],
    CS: [
      { title: "1:1 Inquiry", url: "/_admin/cs/inquiry" },
      { title: "FAQ", url: "/_admin/cs/faq" },
      { title: "Notice", url: "/_admin/cs/notice" },
    ],
  };

  return (
    <>
      <Box className="admin-logo-wrap">
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "18px",
            fontWeight: 300,
            letterSpacing: "8px",
            color: "#1C1A17",
          }}
        >
          MONOLITH
        </span>
      </Box>
      <Box className="admin-info-card">
        <Avatar src="/icons/user_profile.png" sx={{ width: 40, height: 40 }} />
        <Box className="admin-info-text">
          <Typography className="brand-name">admin</Typography>
          <Typography className="brand-sub">010998877622</Typography>
        </Box>
      </Box>
      <Divider />
      {menu_set.map((item, index) => (
        <List className={"menu_wrap"} key={index} disablePadding>
          <ListItemButton
            onClick={item.on_click}
            component={"li"}
            className={clickMenu[0] === item.title ? "menu on" : "menu"}
            sx={{
              minHeight: 48,
              justifyContent: openMenu ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openMenu ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
            <ExpandMore
              sx={{
                transition: 'transform 0.25s ease',
                transform: clickMenu.find((menu: string) => item.title === menu)
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
              }}
            />
          </ListItemButton>
          <Collapse
            in={!!clickMenu.find((menu: string) => menu === item.title)}
            className="menu"
            timeout={250}
            component="li"
          >
            <List className="menu-list" disablePadding>
              {sub_menu_set[item.title] &&
                sub_menu_set[item.title].map((sub: any, i: number) => (
                  <Link href={sub.url} shallow={true} replace={true} key={i}>
                    <ListItemButton
                      component="li"
                      className={
                        clickMenu[0] === item.title &&
                        clickSubMenu === sub.title
                          ? "li on"
                          : "li"
                      }
                    >
                      <Typography variant={sub.title} component={"span"}>
                        {sub.title}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
            </List>
          </Collapse>
        </List>
      ))}
    </>
  );
};

export default AdminMenuList;
