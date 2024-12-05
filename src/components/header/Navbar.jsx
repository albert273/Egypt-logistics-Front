"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import logo from "../../../public/images/log0_page-0001.jpg";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import Image from "next/image";
import AppsOutageRoundedIcon from "@mui/icons-material/AppsOutageRounded";
import AppBar from "./AppBar";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import cookie from "cookie-universal";
import ImportExportIcon from "@mui/icons-material/ImportExport";
const buttons = [
  { id: "1", title: "Home", link: "/" },
  { id: "2", title: "About Us", link: "/pages/About" },
  { id: "3", title: "Service", link: "/pages/Services" },
  {
    id: "4",
    title: "Industries",
    icon: <ArrowDropDownIcon />,
    list: [
      {
        id: "1",
        title: "Automotive Feeding Industry",
        link: "/pages/Industries/automotive-feeding-industry",
      },
      {
        id: "2",
        title: "Clinical Trials Samples Logistics",
        link: "/pages/Industries/clinical-trials-samples-logistics",
      },
      {
        id: "3",
        title: "Dangerous goods logistics",
        link: "/pages/Industries/dangerous-goods-logistics",
      },
      {
        id: "4",
        title: "Pharmaceutical",
        link: "/pages/Industries/Pharmaceutical",
      },
      {
        id: "5",
        title: "Live animals transportation",
        link: "/pages/Industries/live-animals-and-pets",
      },
      {
        id: "6",
        title: "General Cargo Transportation",
        link: "/pages/Industries/general-cargo-transportation",
      },
    ],
  },
  { id: "5", title: "Contact Us", link: "/pages/ContactUs" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [appBar, setAppBar] = useState(false);
  const [industriesHover, setIndustriesHover] = useState(false);
  const [role, setRole] = useState();
  const cookies = cookie();

  const appBarRef = useRef(null);

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        appBar &&
        appBarRef.current &&
        !appBarRef.current.contains(event.target)
      ) {
        setAppBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [appBar]);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          width: { xs: "100%", sm: isScrolled ? "100%" : "85%" },
          backgroundColor: "#f8f9fa",
          paddingLeft: { xs: 0, sm: isScrolled ? "180px" : "0" },
          paddingRight: { xs: "20px", sm: isScrolled ? "60px" : "50px" },
          boxShadow: isScrolled
            ? { xs: "none", sm: "0px 4px 15px rgba(0, 0, 0, 0.1)" }
            : "0px 4px 8px rgba(0, 0, 0, 0.05)",
          zIndex: 299,
          position: "fixed",
          top: { xs: 0, sm: isScrolled ? 0 : "24px" },
          left: 0,
          right: 0,
          marginX: "auto",
          transition: "all 0.5s ease-in-out",
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          gap={5}
          alignItems={"center"}
          sx={{ cursor: "pointer" }}
        >
          <Button
            sx={{
              fontSize: "40px",
              color: "#1a1a2b",
              display: "inline-block",
              height: "90px",
              width: "90px",
              lineHeight: "95px",
              textAlign: "center",
              background: "#f2f2f2",
            }}
            onClick={() => setAppBar(true)}
          >
            <AppsOutageRoundedIcon sx={{ width: 40, height: 40 }} />
          </Button>
          <Link href="/">
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Image src={logo} width={200} height={100} alt="logo1" />
            </Box>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          gap={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {buttons.map((button) => (
            <Box key={button.id} position="relative">
              {button.list ? (
                <Box>
                  <Typography
                    onMouseEnter={() => setIndustriesHover(true)}
                    onMouseLeave={() => setIndustriesHover(false)}
                    sx={{
                      color: "#5A5D63",
                      fontSize: "16px",
                      "&:hover": { color: "#dd3333", cursor: "pointer" },
                      transition: ".3s",
                      fontWeight: "bold",
                      userSelect: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {button.title}
                    {button.icon && button.icon}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      backgroundColor: "white",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                      zIndex: 200,
                      padding: "10px",
                      mt: "8px",
                      borderRadius: "4px",
                      borderTop: "4px solid #dd3333",
                      opacity: industriesHover ? 1 : 0,
                      transform: industriesHover ? "scale(1)" : "scale(0.95)",
                      transition: "all 0.2s ease-out 0.3s",
                      pointerEvents: industriesHover ? "auto" : "none",
                      width: "230px",
                    }}
                    onMouseEnter={() => setIndustriesHover(true)}
                    onMouseLeave={() => setIndustriesHover(false)}
                  >
                    {button.list.map((item) => (
                      <Link key={item.id} href={item.link}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            "&:hover": { color: "#dd3333" },
                            cursor: "pointer",
                            transition: ".3s",
                            paddingY: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Link href={button.link}>
                  <Typography
                    sx={{
                      color: "#5A5D63",
                      fontSize: "16px",
                      "&:hover": { color: "#dd3333", cursor: "pointer" },
                      transition: ".3s",
                      fontWeight: "bold",
                      userSelect: "none",
                      paddingX: "10px",
                    }}
                  >
                    {button.title}
                  </Typography>
                </Link>
              )}
            </Box>
          ))}
        </Stack>

        {role === "client" ? (
          <Link href={"/pages/Requests"}>
            <Stack
              alignItems={"center"}
              sx={{
                "&:hover": { cursor: "pointer" },
                "&:hover .titleRequestsIcon": { color: "#dd3333" },
                "&:hover .requestsIcon": { color: "#dd3333" },
              }}
            >
              <ImportExportIcon
                className="requestsIcon"
                sx={{ fontSize: "2rem", color: "#5A5D63", transition: ".3s" }}
              />
              <Typography
                className="titleRequestsIcon"
                sx={{ fontWeight: "bold", color: "#5A5D63", transition: ".3s" }}
              >
                Requests
              </Typography>
            </Stack>
          </Link>
        ) : null}

        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{
            display: { xs: "none", lg: "inline" },
          }}
        >
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
                "&:hover": { backgroundColor: "black" },
              }}
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

          {role ? null : (
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
                  "&:hover": { backgroundColor: "black" },
                }}
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
          {role ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "black",
                  padding: {
                    xs: "8px 12px",
                    sm: "10px 16px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
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
                  window.location.pathname='/'
                }}
              >
                logout
              </Button>
          ) : null}
        </Stack>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Link href={"/"}>
            <Image src={logo} width={180} height={100} alt="logo2" />
          </Link>
        </Box>
      </Stack>

      {appBar ? (
        <AppBar
          isOpen={appBar}
          setAppBar={setAppBar}
          buttons={buttons}
          appBarRef={appBarRef}
        />
      ) : null}
    </>
  );
};

export default Navbar;
