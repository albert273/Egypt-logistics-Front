"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Image1 from "../../../public/images/section2/ca-expand-gallery3.1.png";
import Image2 from "../../../public/images/section2/ca-expand-gallery3.2.png";
import Image3 from "../../../public/images/section2/ca-expand-gallery3.3.png";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import { gsap } from "gsap";

function Section2() {
  const [active, setActive] = useState("imag1");
  const images = [
    { img: Image1, id: "1", title: "Image1" },
    { img: Image2, id: "2", title: "Image2" },
    { img: Image3, id: "3", title: "Image3" },
    { img: Image1, id: "4", title: "Image4" },
    { img: Image2, id: "5", title: "Image5" },
  ];
  const topRef = useRef(null);
  const sectionRef = useRef(null);

  const handleMouseEnter = (imageName) => {
    setActive(imageName);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.set(topRef.current, { y: "100%", opacity: 0 });

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up the observer on component unmount
      }
    };
  }, []);

  console.log(active);
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        paddingTop: "100px",
        paddingBottom: "70px",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "90%" }} ref={sectionRef}>
        <Stack sx={{ display: "flex", justifyContent: "center" }} gap={4}>
          <Stack ref={topRef}>
            <Box
              sx={{
                padding: "8px 12px",
                backgroundColor: "#ffcdd2",
                paddingLeft: "22px",
                borderRadius: "50px",
                width: "150px",
                marginX: "auto",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "black",
                  borderLeft: "solid 4px #dd3333",
                  paddingLeft: "16px",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Our Service
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ textAlign: "center", marginY: "1rem" }}
              >
                Our Range of Logistics Services
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
                Our state-of-the-art facilities and innovative technology
                support e-commerce
                <br /> fulfillment and project cargo handling, providing you
                with tailored solutions.
              </Typography>
            </Box>
          </Stack>

          <Stack
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            gap={1}
            justifyContent={"center"}
          >
            {images.map((image) => (
              <Box
                key={image.id}
                onMouseEnter={() => handleMouseEnter(image.title)}
                sx={{
                  height: "370px",
                  borderRadius: "16px",
                  margin: "10px",
                  cursor: "pointer",
                  color: "#fff",
                  flex: 1,
                  backgroundSize: "cover !important",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                  background: "#dd3333",
                  overflow: "hidden",
                  transition: "all 0.5s",
                  "&:hover .hoverContent": {
                    width: "100%", // Full width on hover
                    opacity: 1, // Make it visible on hover
                  },
                  "&:hover": {
                    flex: 2,
                    transition: "all 0.5s",
                  },
                }}
              >
                <Image
                  src={image.img}
                  alt={image.title}
                  style={{ maxWidth: "100%", objectFit: "cover" }}
                />
                <Box
                  className="hoverContent"
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "0%", // Initially starts at 0 width (hidden)
                    backgroundColor: "#dd3333", // Semi-transparent background
                    transition: "width 0.3s ease, opacity 0.3s ease", // Smooth transition
                    zIndex: 99,
                    opacity: 0, // Initially hidden
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "15px",
                    padding: "48px 32px",
                    userSelect: "none",
                    // Keep the border radius
                  }}
                >
                  <Stack
                    sx={{
                      color: "white",
                      width: "70px",
                      height: "70px",
                      backgroundColor: "#ff5252",
                      borderRadius: "50px",
                      lineHeight: "65px",
                    }}
                  >
                    <PublicTwoToneIcon
                      sx={{
                        fontSize: "2.4rem",
                        verticalAlign: "middle",
                        marginY: "auto",
                        marginX: "auto",
                      }}
                    />
                  </Stack>

                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                      fontSize: "20px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#fff",
                      marginTop: "32px",
                      marginBottom: "16px",
                    }}
                  >
                    Supply chain management
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#fff",
                      opacity: 0.8,
                    }}
                  >
                    At Egypt Logistics, we provide a comprehensive range of
                    logistics services tailored to meet your business needs.
                    With a focus on efficiency, compliance, and client
                    satisfaction, our team of experts is ready to handle every
                    aspect of your supply chain. Explore our core services
                    below:
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Section2;
