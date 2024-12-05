"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/images/log0_page-0001.jpg";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { gsap } from "gsap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import cookie from "cookie-universal";
import LogoutIcon from "@mui/icons-material/Logout";

function AppBar({ setAppBar, isOpen, buttons, appBarRef }) {
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const dropdownRef = useRef(null);
  const cookies = cookie();

  useEffect(() => {
    if (isOpen) {
      gsap.to(appBarRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(appBarRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => setAppBar(false),
      });
    }
  }, [isOpen, setAppBar, appBarRef]);
  

  const handleCloseWithAnimation = () => {
    gsap.to(appBarRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => setAppBar(false), // Close after the animation
    });
  };

  const handleToggleDropdown = () => setOpenDropdown(!openDropdown);

  useEffect(() => {
    if (openDropdown) {
      gsap.fromTo(
        dropdownRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.6, ease: "power1.inOut" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
      });
    }
  }, [openDropdown]);

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
    setIsLoading(false);
  }, []);

  return (
    <Box
      ref={appBarRef}
      sx={{
        background: "rgb(0,0,0, 0.9)",
        height: "100%",
        position: "fixed",
        zIndex: 1000,
        right: 0,
        top: 0,
        width: {
          xs: "100%", // Full width on small screens
          sm: "465px", // Fixed width on medium screens and above
        },
        padding: "45px",
        overflowY: "auto",
        scrollbarWidth: "none",
        transform: "translateX(100%)", // Start outside the screen
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginBottom: "50px" }}
      >
        <Link href={"/"}>
          <Image width={180} height={100} src={logo} alt="logo" />
        </Link>
        <CloseIcon
          sx={{ fontSize: "2rem", color: "#ffffff", cursor: "pointer" }}
          onClick={handleCloseWithAnimation}
        />
      </Stack>

      <Box sx={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="search"
          name="s"
          placeholder="What are you searching for?"
          style={{
            width: "100%",
            border: 0,
            padding: "5px 15px",
            fontWeight: 300,
            background: "none",
            border: "1px solid #868686",
            color: "#ffffff",
            height: "40px",
            paddingRight: "40px",
          }}
        />
        <SearchIcon
          sx={{
            position: "absolute",
            top: "50%",
            right: "15px",
            transform: "translateY(-50%)",
            color: "#868686",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box sx={{ marginBottom: "50px", display: { xs: "block", md: "none" } }}>
        {buttons.map((button) => (
          <React.Fragment key={button.id}>
            {button.link ? (
              <Link
                href={button.link}
                onClick={() => {
                  setOpenDropdown(false);
                  handleCloseWithAnimation();
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "18px",
                    "&:hover": { color: "#dd3333", cursor: "pointer" },
                    transition: ".3s",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                    opacity: 0.7,
                    borderTop: "1px solid #28283f",
                  }}
                >
                  {button.title}
                </Typography>
              </Link>
            ) : (
              <Box
                sx={{
                  color: "#ffffff",
                  fontSize: "18px",
                  "&:hover": { color: "#dd3333", cursor: "pointer" },
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 0",
                  opacity: 0.7,
                  borderTop: "1px solid #28283f",
                  justifyContent: "space-between",
                }}
                onClick={handleToggleDropdown}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  {button.title}
                </Typography>
                <ArrowDropDownIcon sx={{ ml: 1 }} />
              </Box>
            )}

            {button.title === "Industries" && (
              <Box
                ref={dropdownRef}
                sx={{
                  pl: 4,
                  color: "#ffffff",
                  overflow: "hidden",
                  height: "auto",
                }}
              >
                {button.list.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={handleCloseWithAnimation}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "18px",
                        "&:hover": { color: "#dd3333", cursor: "pointer" },
                        transition: "color 0.3s ease",
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                        opacity: 0.7,
                        borderTop: "1px solid #28283f",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>


      <Typography
        sx={{
          fontSize: "16px",
          color: "#ffffff",
          opacity: 0.7,
          fontWeight: 100,
          marginBottom: "20px",
        }}
      >
        DGL International is one of the rare
        <br /> companies proficient of handling and packing <br />
        DGR shipment.
      </Typography>
      <Stack direction={"row"} alignItems={"center"} sx={{ mb: "50px" }}>
        <Link href={"/pages/UserQuote"}>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#dd3333",
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              marginRight: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "16px",
              transition: ".3s",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
            onClick={handleCloseWithAnimation}
            endIcon={
              <ForwardOutlinedIcon
                sx={{
                  height: "28px",
                  width: "28px",
                  lineHeight: "32px",
                  marginLeft: "6px",
                }}
              />
            }
          >
            Get A Quote
          </Button>
        </Link>
        {role ? (
          <Link href={"/"}>
            {" "}
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#eeeeee",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                color: "black",
                "&:hover": { backgroundColor: "#bdbdbd" },
              }}
              endIcon={
                <LogoutIcon
                  sx={{
                    height: "28px",
                    width: "28px",
                    lineHeight: "32px",
                    marginLeft: "6px",
                  }}
                />
              }
              onClick={() => {
                cookies.removeAll();
                window.location.pathname = "/";
              }}
            >
              logout
            </Button>
          </Link>
        ) : (
          <Link href={"/pages/Login"}>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#0d47a1",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#283593" },
              }}
              onClick={handleCloseWithAnimation}
              endIcon={
                <LoginIcon
                  sx={{
                    height: "28px",
                    width: "28px",
                    lineHeight: "32px",
                    marginLeft: "6px",
                  }}
                />
              }
            >
              login
            </Button>
          </Link>
        )}
      </Stack>
      <Typography
        sx={{
          fontSize: "24px",
          color: "#ffffff",
          paddingBottom: "10px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Contact Info
      </Typography>
      <Stack gap={3} justifyContent={"start"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ color: "#ffffff", opacity: 0.7 }}
          gap={4}
        >
          <LocationOnIcon sx={{ fontSize: "30px" }} />
          <Typography>
            6 Ankara street , Sheraton Heliopolis , District 4 , Heliopolis ,
            Cairo,Egypt
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ color: "#ffffff", opacity: 0.7 }}
          gap={4}
        >
          <LocalPhoneIcon sx={{ fontSize: "30px" }} />
          <Typography>+2 01066611788 </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        gap={1}
        sx={{ color: "white", marginTop: "30px", opacity: 0.7 }}
      >
        <FacebookIcon
          sx={{
            "&:hover": {
              color: "#dd3333",
              cursor: "pointer",
              fontSize: "30px",
            },
            transition: "0.3s",
          }}
        />
        <InstagramIcon
          sx={{
            "&:hover": {
              color: "#dd3333",
              cursor: "pointer",
              fontSize: "30px",
            },
            transition: "0.3s",
          }}
        />
        <XIcon
          sx={{
            "&:hover": {
              color: "#dd3333",
              cursor: "pointer",
              fontSize: "30px",
            },
            transition: "0.3s",
          }}
        />
        <LinkedInIcon
          sx={{
            "&:hover": {
              color: "#dd3333",
              cursor: "pointer",
              fontSize: "30px",
            },
            transition: "0.3s",
          }}
        />
      </Stack>
    </Box>
  );
}

export default AppBar;
