"use client";
import { usePathname } from "next/navigation";
import useNavigation from "../../../../src/utils/navigation";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  styled,
  useTheme,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import { useEffect, useState } from "react";
import cookie from "cookie-universal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Array1 = [
  {
    text: "Home",
    icon: <HomeOutlinedIcon />,
    path: "/dashboard",
    active: "/dashboard",
  },
  {
    text: "Clint data",
    icon: <PeopleOutlinedIcon />,
    path: "/dashboard/ClintData",
    active: "/dashboard/ClintData",
  },
  {
    text: "Manage client",
    icon: <ContactsOutlinedIcon />,
    path: "/dashboard/MangeClient",
    active: "/dashboard/MangeClient",
  },
  {
    text: "Create Client",
    icon: <PersonAddIcon />,
    path: "/dashboard/CreateClient",
    active: "/dashboard/CreateClient",
  },
  {
    text: "Message",
    icon: <QuestionAnswerIcon />,
    path: "/dashboard/Message",
    active: "/dashboard/Message",
  },
];

const Array2 = [
  {
    text: "Manage Head Officer",
    icon: <BadgeIcon />,
    path: "/dashboard/ManageHeadOfficer",
    active: "/dashboard/ManageHeadOfficer",
  },
  {
    text: "Create Head Officer",
    icon: <PersonAddIcon />,
    path: "/dashboard/CreateHeadOfficer",
    active: "/dashboard/CreateHeadOfficer",
  },
];
const Array3 = [
  {
    text: "Guest Quotes",
    icon: <CategoryIcon />,
    path: "/dashboard/GuestQuote",
    active: "/dashboard/GuestQuote",
  },
];

export default function SideBar({ open, handleDrawerClose }) {
  const { navigate } = useNavigation();
  const path = usePathname();
  const theme = useTheme();
  const cookies = cookie();
  const iconLocation = path;
  const role = cookies.get("role");

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserName(cookies.get("name") || "");
    setUserRole(cookies.get("role") || "");
  }, [cookies]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        backgroundColor: "#f5f5f5",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "120px",
        },
      }}
    >
      <DrawerHeader sx={{ backgroundColor: "#f5f5f5" }}>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            backgroundColor: "#ffcdd2",
            color: "#dd3333",
            transition: ".3s",
            "&:hover": { backgroundColor: "#dd3333", color: "#e8eaf6" },
          }}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ backgroundColor: "#f5f5f5" }}>
        <Avatar
          sx={{
            mx: "auto",
            width: open ? 88 : 44,
            height: open ? 88 : 44,
            my: 1,
            border: "2px solid",
            borderColor: "#dd3333",
            transition: "0.25s",
          }}
          alt=""
          src=""
        />
        <Typography
          align="center"
          sx={{ fontSize: open ? 17 : 0, transition: "0.25s", fontWeight: 500 }}
        >
          {userName}
        </Typography>
        <Typography
          align="center"
          sx={{
            fontSize: open ? 15 : 0,
            transition: "0.25s",
            color: "#dd3333",
            textTransform: "capitalize",
          }}
        >
          {userRole}
        </Typography>
      </Box>

      <Divider />

      <List sx={{ backgroundColor: "#f5f5f5" }}>
        {Array1.map((item, index) => (
          <ListItem
            key={`${item.text}-${index}`}
            disablePadding
            sx={{ display: "block" }}
          >
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  backgroundColor:
                    iconLocation === item.active ? "#dd3333" : null,
                  borderRadius: "10px",
                  transition: "100ms",
                  "&:hover": {
                    backgroundColor:
                      iconLocation === item.active ? "#dd3333" : null,
                  },
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    padding: "8px",
                    borderRadius: "10px",
                    transition: "100ms",
                    color: iconLocation === item.active ? "white" : "#dd3333",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: iconLocation === item.active ? "white" : "black",
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider />

      {userRole === "admin" ? (
        <List sx={{ backgroundColor: "#f5f5f5" }}>
          {Array2.map((item, index) => (
            <ListItem
              key={`${item.text}-${index}`}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip title={open ? null : item.text} placement="left">
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    backgroundColor:
                      iconLocation === item.active ? "#dd3333" : null,
                    borderRadius: "10px",
                    transition: "100ms",
                    "&:hover": {
                      backgroundColor:
                        iconLocation === item.active ? "#dd3333" : null,
                    },
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      padding: "8px",
                      borderRadius: "10px",
                      transition: "100ms",
                      color: iconLocation === item.active ? "white" : "#dd3333",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: iconLocation === item.active ? "white" : "black",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      ) : null}

      <Divider />

      <List sx={{ backgroundColor: "#f5f5f5" }}>
        {Array3.map((item, index) => (
          <ListItem
            key={`${item.text}-${index}`}
            disablePadding
            sx={{ display: "block" }}
          >
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  backgroundColor:
                    iconLocation === item.active ? "#dd3333" : null,
                  borderRadius: "10px",
                  transition: "100ms",
                  "&:hover": {
                    backgroundColor:
                      iconLocation === item.active ? "#dd3333" : null,
                  },
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    padding: "8px",
                    borderRadius: "10px",
                    transition: "100ms",
                    color: iconLocation === item.active ? "white" : "#dd3333",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: iconLocation === item.active ? "white" : "black",
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

