"use client"; // Mark as a Client Component
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import image1 from "../../../public/images/about/ca-choose-ing1.1.png";
import image2 from "../../../public/images/about/ca-ch-2.png";
import CheckIcon from "@mui/icons-material/Check";
import { gsap } from "gsap";

function WhyChoose() {
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset the elements before playing the animation again
            gsap.set(rightRef.current, { x: "100%", opacity: 0 });
            gsap.set(leftRef.current, { x: "-100%", opacity: 0 });

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
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up the observer on component unmount
      }
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", paddingY: "30px" }}>
      <Container
        maxWidth={false}
        sx={{
          paddingTop: "50px",
          maxWidth: "85%",
          margin: "30px auto",
        }}
        ref={sectionRef} // Attach the ref to the section
      >
        <Grid container spacing={14} alignItems={"center"}>
          <Grid item xs={12} md={6} ref={leftRef}>
            <Stack spacing={3}>
              <Box
                sx={{
                  padding: "8px 12px",
                  backgroundColor: "#ffebee",
                  paddingLeft: "22px",
                  borderRadius: "50px",
                  width: "160px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#dd3333",
                    borderLeft: "solid 4px #dd3333",
                    paddingLeft: "16px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Why Choose Us
                </Typography>
              </Box>

              <Typography variant="h4" fontWeight="bold">
                Meet the Team: Experts in Logistics Management
              </Typography>
              <Typography variant="body1" sx={{ color: "#5a5d63" }}>
                Extensive Experience: Over a decade of expertise in logistics,
                backed by a strong track record of successful operations and
                long-term client relationships. Integrated Solutions: We provide
                end-to-end logistics services designed to meet the unique needs
                of diverse industries, from textiles and fashion to industrial
                manufacturing and scientific research
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                <Box
                  sx={{
                    padding: "16px 24px",
                    backgroundColor: "#ffebee",
                    borderRadius: "8px",
                    display: "inline-block",
                    width: "100%",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      background: "#dd3333",
                      borderRadius: "5px",
                      height: "100%",
                      width: "6px",
                      left: 0,
                      top: 0,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      pb: "16px",
                    }}
                  >
                    Global Network
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5a5d63",
                    }}
                  >
                    Membership in leading logistics alliances like
                    MarcopoloLine, GLA, and Millennium Networks enhances our
                    global reach and service capabilities.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    padding: "16px 24px",
                    backgroundColor: "#ffebee",
                    borderRadius: "8px",
                    display: "inline-block",
                    width: "100%",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      background: "#dd3333",
                      borderRadius: "5px",
                      height: "100%",
                      width: "6px",
                      left: 0,
                      top: 0,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      pb: "16px",
                    }}
                  >
                    Customer Focus
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5a5d63",
                    }}
                  >
                    Our team prioritizes client satisfaction, offering personalized service, real-time updates, and proactive communication at every stage of the shipment process.

                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} ref={rightRef}>
            <Stack
              direction="row"
              sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  flex: "0 0 auto",
                }}
              >
                <Image
                  src={image1} // replace with your actual image path
                  style={{ objectFit: "cover", borderRadius: "15px" }}
                  alt="Image 1"
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  width: { xs: "80%", md: "100%" },
                  height: { xs: "80%", md: "100%" },
                  right: "-280px",
                  ZIndex: 11,
                  bottom: "-390px",
                  borderRadius: "3px",
                }}
              >
                <Image
                  src={image2}
                  style={{
                    objectFit: "cover",
                    borderRadius: "15px",
                    border: "4px solid #fff",
                  }}
                  alt="Image2"
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default WhyChoose;
