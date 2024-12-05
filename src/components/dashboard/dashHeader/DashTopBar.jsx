'use client'
import {
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Image from "next/image";
import logo from "../../../../public/images/log0_page-0001.jpg"
import cookie from 'cookie-universal'


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({ open, handleDrawerOpen }) => {
  const cookies = cookie();

  return (
    <AppBar
      position="fixed"
      // @ts-ignore
      open={open}
      sx={{
        height: "4.3rem",
        backgroundColor: "#f5f5f5",
        color: "#dd3333",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            backgroundColor: "#ffcdd2",
            color: "#dd3333",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#dd3333", color: "#e8eaf6" },
            transition: ".3s",
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          direction={'row'}
          gap={1}
          alignItems={'center'}
          sx={{
            mr: 2,
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        >
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
          <Typography
            sx={{
              color: "black",
              fontWeight: "bolder",
              fontSize: { xs: "1rem", sm: "1.3", md: "1.5rem" },
              display: { xs: "none", sm: "block" },
            }}
          >
            Uni Cargo
          </Typography>
        </Stack>
        <Box flexGrow={1} />

        <Stack direction={"row"}>
          <Link href="/">
            <IconButton
              sx={{
                backgroundColor: "#ffcdd2",
                color: "#dd3333",
                borderRadius: "10px",
                marginX: "5px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#dd3333", color: "#e8eaf6" },
              }}
            >
              <HomeOutlinedIcon />
            </IconButton>
          </Link>
          <Link href="/">
            <IconButton
              sx={{
                backgroundColor: "#ffcdd2",
                color: "#dd3333",
                borderRadius: "10px",
                marginX: "5px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#dd3333", color: "#e8eaf6" },
              }}
              onClick={() => cookies.removeAll()}
            >
              <LogoutIcon />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
