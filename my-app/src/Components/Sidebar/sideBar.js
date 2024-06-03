import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [avatarInitials, setAvatarInitials] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    if (userDataJson) {
      const userDataParsed = JSON.parse(userDataJson);
      setUserData(userDataParsed);
      if (userDataParsed.user) {
        const { fname, lname } = userDataParsed.user;
        const firstNameInitial = fname.charAt(0).toUpperCase();
        const lastNameInitial = lname.charAt(0).toUpperCase();
        setAvatarInitials(`${firstNameInitial}${lastNameInitial}`);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <SpaceDashboardRoundedIcon />,
      link: "/dashboard",
    },
    {
      text: "Security Profile",
      icon: <SecurityIcon />,
      link: "/securityprofile",
    },
    {
      text: "User Profile",
      icon: <AccountCircleIcon />,
      link: "/userProfile",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ background: "black" }}>
          <Typography variant="h6" noWrap component="div">
            Digi Telescope
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleAvatarClick}>
              {userData ? <Avatar>{avatarInitials}</Avatar> : <Avatar />}
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#3d3d5c",
          },
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map(({ text, icon, link }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "flex", flex: 1 }}
            >
              <ListItemButton
                component={Link}
                to={link}
                title={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background:
                    location.pathname === link ? "#9494b8" : "transparent",
                  "&:hover": {
                    background: "#d1d1e0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;
