"use client"; // Mark as a Client Component
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";
import Form from "./Form";

function Section({ handleOpen }) {
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const sectionRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current; // Capture the current value of the ref

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset the elements before playing the animation again
            gsap.set(rightRef.current, { x: "100%", opacity: 0 });
            gsap.set(leftRef.current, { x: "-100%", opacity: 0 });
            gsap.set(topRef.current, { y: "100%", opacity: 0 });

            // Play the animation when the section comes into view
            gsap.to(rightRef.current, {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            });
            gsap.to(leftRef.current, {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            });
            gsap.to(topRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (currentSection) {
      observer.observe(currentSection); // Observe the section
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection); // Clean up the observer on component unmount
      }
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", paddingY: "30px" }}>
      <Container
        maxWidth={false}
        sx={{
          paddingTop: "50px",
          paddingBottom: "50px",
          width: { xs: "100%", md: "90%" },
          paddingX: 0,
        }}
        ref={sectionRef} // Attach the ref to the section
      >
        <Stack ref={topRef} sx={{ marginBottom: "100px" }}>
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ textAlign: "center", marginY: "1rem" }}
            >
              Trusted by Industry Leaders
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "#5a5d63",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Gain insights into effective warehouse management strategies that
              <br />
              maximize space, improve accuracy, and boost productivity.
            </Typography>
          </Box>
        </Stack>

        <Stack
          gap={5}
          alignItems={"center"}
          direction={{ xs: "column", lg: "row" }}
        >
          <Stack
            ref={leftRef}
            justifyItems={"center"}
            sx={{ width: { xs: "100%", md: "50%" } }}
          >
            <Form onFormSubmit={handleOpen} />
          </Stack>
          <Stack direction="column" gap={3} ref={rightRef}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={3}
              sx={{
                alignItems: "center",
                background: "#fff",
                padding: "24px",
                borderRadius: "7px",
                overflow: "hidden",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#dd3333" },
                "&:hover .text": { color: "white" },
                "&:hover .iconBox": {
                  backgroundColor: "#e57373",
                  color: "white",
                },
                width: "100%",
              }}
            >
              <Box
                className="iconBox"
                sx={{
                  background: "#E7EDF6",
                  display: "block",
                  textAlign: "center",
                  borderRadius: "50px",
                  padding: "19px 20px",
                  transition: ".3s",
                }}
              >
                <AccessAlarmIcon sx={{ fontSize: "2.5rem" }} />
              </Box>
              <Stack gap={1}>
                <Typography
                  component="h3"
                  className="text"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                    transition: ".3s",
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#5A5D63",
                    transition: ".3s",
                  }}
                >
                  6 Ankara street, Sheraton Heliopolis, District 4, Heliopolis,
                  Cairo, Egypt
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={3}
              sx={{
                alignItems: "center",
                background: "#fff",
                padding: "24px",
                borderRadius: "7px",
                overflow: "hidden",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#dd3333" },
                "&:hover .text": { color: "white" },
                "&:hover .iconBox": {
                  backgroundColor: "#e57373",
                  color: "white",
                },
                width: "100%",
              }}
            >
              <Box
                className="iconBox"
                sx={{
                  background: "#E7EDF6",
                  display: "block",
                  textAlign: "center",
                  borderRadius: "50px",
                  padding: "19px 20px",
                  transition: ".3s",
                }}
              >
                <MailIcon sx={{ fontSize: "2.5rem" }} />
              </Box>
              <Stack gap={1}>
                <Typography
                  component="h3"
                  className="text"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                    transition: ".3s",
                  }}
                >
                  Send Email
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#5A5D63",
                    transition: ".3s",
                  }}
                >
                  <Box
                    component="a"
                    href="mailto:gm@uni-cargo.net"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      "&:hover": { color: "black" },
                    }}
                  >
                    gm@uni-cargo.net
                  </Box>
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={3}
              sx={{
                alignItems: "center",
                background: "#fff",
                padding: "24px",
                borderRadius: "7px",
                overflow: "hidden",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#dd3333" },
                "&:hover .text": { color: "white" },
                "&:hover .iconBox": {
                  backgroundColor: "#e57373",
                  color: "white",
                },
                width: "100%",
              }}
            >
              <Box
                className="iconBox"
                sx={{
                  background: "#E7EDF6",
                  display: "block",
                  textAlign: "center",
                  borderRadius: "50px",
                  padding: "19px 20px",
                  transition: ".3s",
                }}
              >
                <PhoneInTalkIcon sx={{ fontSize: "2.5rem" }} />
              </Box>
              <Stack gap={1}>
                <Typography
                  component="h3"
                  className="text"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                    transition: ".3s",
                  }}
                >
                  For Support
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#5A5D63",
                    transition: ".3s",
                  }}
                >
                  <Stack gap={.8} direction={{ xs: "column", md: "row" }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { color: "black" },
                      }}
                    >
                      <a
                        href="tel:(+202) 22696370"
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          "&:hover": { color: "black" },
                        }}
                      >
                        (+202)22696370
                      </a>
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
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { color: "black" },
                      }}
                    >
                      <a
                        href="tel:375-(+202)26433421"
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          "&:hover": { color: "black" },
                        }}
                      >
                        375-(+202)26433421
                      </a>
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
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { color: "black" },
                      }}
                    >
                      <a href="tel:425">425</a>
                    </Typography>
                  </Stack>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Section;
