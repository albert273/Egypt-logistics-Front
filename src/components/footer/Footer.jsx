'use client'
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import logoWhite from "../../../public/images/log0_page-0001.jpg";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import SupportAgentSharpIcon from "@mui/icons-material/SupportAgentSharp";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import FaxIcon from "@mui/icons-material/Fax";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { gsap } from "gsap";

const buttons = [
  { id: "1", title: "Home", link: "/" },
  { id: "2", title: "About us", link: "/pages/About" },
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
function Footer() {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const dropdownRef = useRef(null);
  const handleToggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleCloseWithAnimation = () => {
    gsap.to(appBarRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => setAppBar(false), // Close after the animation
    });
  };

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
  return (
    <Box sx={{ backgroundColor: "#222222" }}>
      <Container maxWidth={false} sx={{ width: "100%", paddingTop: "50px" }}>
        <Stack
          gap={10}
          justifyContent={"space-around"}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            color: "white",
            borderBottom: "2px solid #616161",
            paddingBottom: "30px",
          }}
        >
          <Stack gap={3}>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Image src={logoWhite} alt="logo" width={170} height={95} />
            </Stack>
            <Typography>
              {" "}
              6 Ankara street , Sheraton Heliopolis ,<br /> District 4 ,
              Heliopolis , Cairo,Egypt
            </Typography>
            <Stack direction={"row"} gap={1}>
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
          </Stack>
          <Stack gap={2} alignItems={'center'}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Stack gap={1} alignItems={"center"}>
              {buttons.map((button) => (
                <Box key={button.id} >
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
                          opacity: 0.7,
                          borderTop: "1px solid #28283f",
                          textAlign: 'center'
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
                        opacity: 0.7,
                        borderTop: "1px solid #28283f",
                        justifyContent: "center",
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
                              "&:hover": {
                                color: "#dd3333",
                                cursor: "pointer",
                              },
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
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap={2}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"center"}
              sx={{ borderBottom: "2px solid #616161", paddingBottom: "20px" }}
            >
              <SupportAgentSharpIcon
                sx={{ fontSize: "2rem", color: "#dd3333" }}
              />
              <Stack>
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                >
                  For Support & Reservations
                </Typography>
                <Stack
                  gap={0.5}
                  sx={{ flexDirection: { xs: "column", sm: "row" } }}
                >
                  <Typography
                    sx={{
                      "&:hover": { color: "#dd3333" },
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    <a href="tel:(+202) 22696370">(+202)22696370</a>
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    /
                  </Typography>

                  <Typography
                    sx={{
                      "&:hover": { color: "#dd3333" },
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    <a href="tel:375 - (+202) 26433421">375-(+202)26433421</a>
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    /
                  </Typography>
                  <Typography
                    sx={{
                      "&:hover": { color: "#dd3333" },
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    <a href="tel:425">425</a>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack direction={"row"} gap={2}>
              <AlarmOnIcon sx={{ fontSize: "2rem", color: "#dd3333" }} />
              <Stack>
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                >
                  Working Hours
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Head office:
                  <br />
                  Sunday to Thursday
                  <br />
                  8:30 AM - 4:30 PM
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack gap={2}>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Get In Touch
            </Typography>
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"center"}
              sx={{ borderBottom: "2px solid #616161", paddingBottom: "20px" }}
            >
              <FaxIcon sx={{ fontSize: "2rem", color: "#dd3333" }} />
              <Stack>
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                >
                  Fax number
                </Typography>
                <Typography
                  sx={{
                    "&:hover": { color: "#dd3333" },
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  <a href="tel:(+202) 22679632">(+202) 22679632</a>
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              gap={2}
              sx={{
                borderBottom: "2px solid #616161",
                paddingBottom: "20px",
              }}
            >
              <AlarmOnIcon sx={{ fontSize: "2rem", color: "#dd3333" }} />
              <Stack>
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                >
                  Working Hours
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Saturday: 8:30 AM - 3:00 PM
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} gap={2}>
              <AlternateEmailIcon sx={{ fontSize: "2rem", color: "#dd3333" }} />
              <Stack>
                <Typography
                  sx={{
                    color: "#ffffff",
                    opacity: 0.7,
                    textTransform: "capitalize",
                  }}
                >
                  Send Us Email
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    "&:hover": { color: "#dd3333" },
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  <a href="mailto:gm@uni-cargo.net">gm@uni-cargo.net</a>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          color: "white",
          backgroundColor: "black",
          paddingY: "30px",
          paddingX: "40px",
          position: "relative",
        }}
      >
        <Typography>Copyright © 2024 Albert . All Rights Reserved</Typography>
        <Stack
          sx={{
            width: "300px",
            height: "120px",
            background: "#1b1b1b",
            lineHeight: "120px",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", lg: "flex" },
          }}
        >
          <Image
            src={logoWhite}
            alt="logo"
            width={70}
            height={50}
            style={{ margin: "auto", cursor: "pointer" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
