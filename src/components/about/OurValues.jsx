"use client";
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import image1 from "../../../public/images/about/ca-value1.1.png";
import { gsap } from "gsap";

const boxes = [
  { id: "1", title: "Successfully Delivery", value: "25K" },
  { id: "2", title: "Supply Engineers", value: "1800" },
  { id: "3", title: "5 Star Reviews", value: "199" },
  { id: "4", title: "Countries Covered", value: "125" },
];
function OurValues() {
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
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ paddingBottom: "30px" }}>
      <Container
        maxWidth={false}
        sx={{
          paddingTop: "50px",
          paddingBottom: "50px",
          maxWidth: { xs: "100%", md: "80%" },
          margin: "60px auto",
        }}
        ref={sectionRef} // Attach the ref to the section
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Stack
            direction="row"
            sx={{ width: "100%", display: { xs: "none", md: "flex" } }}
            ref={leftRef}
          >
            <Image
              src={image1}
              height={680}
              width={600}
              style={{
                objectFit: "cover",
                borderRadius: "15px",
                verticalAlign: "middle",
              }}
              alt="Image1"
            />
          </Stack>
          <Stack spacing={3} ref={rightRef}>
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
                Our Values
              </Typography>
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: "44px" }}
            >
              Mission Vision & Values Of Your Transport & Logistics
            </Typography>
            <Typography variant="body1" sx={{ color: "#5a5d63" }}>
              Our team of FIATA-certified experts and industry professionals
              offers a comprehensive range of services, including customs
              clearance, re-export, Garments on Hangers (G.O.H), and cargo
              insurance. As proud members of MarcopoloLine, GLA (Global
              Logistics Alliance), and Millennium Networks, we leverage a robust
              international network to ensure reliable and timely delivery of
              your goods across the globe.

            </Typography>
            <Box
              direction={"row"}
              gap={2}
              sx={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}
            >
              {boxes.map((item) => (
                <Stack
                  key={item.id}
                  sx={{
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: "24px 46px",
                    transition: "0.4s",
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#dd3333",
                      color: "#fff",
                      "& .MuiTypography-root": { color: "#fff" }, // This targets all Typography components inside the Stack
                    },
                    cursor: "pointer",
                    color: "#00060F",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "7px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      lineHeight: "32px",
                      fontWeight: "bold",
                      paddingBottom: "14px",
                    }}
                  >
                    {item.value}+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#4A4A49",
                      lineHeight: "26px",
                      marginX: "auto",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default OurValues;
