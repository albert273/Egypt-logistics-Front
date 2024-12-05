"use client"; // Mark as a Client Component
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import image1 from "../../../public/images/about/ca-about-3.3.png";
import image2 from "../../../public/images/about/ca-about1.2.png";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { gsap } from "gsap";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function WhyUs() {
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
    <Container
      maxWidth={false}
      sx={{
        paddingTop: "50px",
        paddingBottom: "50px",
        maxWidth: "85%",
        margin: "60px auto",
      }}
      ref={sectionRef} // Attach the ref to the section
    >
      <Stack direction={"row"} gap={4} alignItems={"center"}>
        <Stack
          direction="row"
          spacing={2}
          ref={leftRef}
          sx={{ position: "relative", display: { xs: "none", lg: "flex" } }}
        >
          <Box
            sx={{
              padding: "32px",
              color: "#fff",
              borderRadius: "7px",
              border: "4px solid #fff",
              bottom: "-50px",
              left: "180px",
              ZIndex: 10,
              backgroundColor: "#dd3333",
              position: "absolute",
            }}
          >
            <Typography
              sx={{ fontSize: "32px", lineHeight: "32px", transition: ".3s" }}
            >
              +25K
            </Typography>
            <Typography sx={{}}>Clients Positive Reviews</Typography>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "450px",
              flex: "0 0 auto",
              paddingBottom: "60px",
            }}
          >
            <Image
              src={image1} // replace with your actual image path
              width={300}
              height={450}
              style={{ objectFit: "cover", borderRadius: "15px" }}
              alt="Image 1"
            />
          </Box>

          <Box
            sx={{
              width: "300px",
              height: "450px",
              paddingTop: "60px",
            }}
          >
            <Image
              src={image2}
              width={300}
              height={450}
              style={{ objectFit: "cover", borderRadius: "15px" }}
              alt="Image 1"
            />
          </Box>
        </Stack>

        <Stack spacing={3} ref={rightRef}>
          <Box
            sx={{
              padding: "8px 12px",
              backgroundColor: "#ffebee",
              paddingLeft: "22px",
              borderRadius: "50px",
              width: "150px",
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
              Why We Are
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight="bold">
            Our Commitment: Reliable And Efficient Logistics
          </Typography>
          <Typography variant="body1" sx={{ color: "#5a5d63" }}>
            Egypt Logistics is a trusted leader in freight forwarding and
            logistics solutions, established in 2011 with a mission to simplify
            the complexities of global trade. We specialize in providing
            seamless transportation services across air, sea, and road,
            delivering tailored solutions for businesses of all sizes.
          </Typography>

          <Stack
            gap={2}
            display={"grid"}
            sx={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {[
              "Experts in Logistics Management",
              "Leaders in Global Logistics",
              "Transforming Transport",
              "Driving Logistics Success",
            ].map((text) => (
              <Stack direction={"row"} gap={0.5} key={text}>
                <CheckIcon
                  sx={{
                    padding: "2px",
                    borderRadius: "50px",
                    backgroundColor: "#ffcdd2",
                    height: "20px",
                    width: "20px",
                    color: "#dd3333",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    lineHeight: "24px",
                  }}
                >
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>

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
              variant="body1"
              sx={{
                color: "#5a5d63",
              }}
            >
              We are driving success and creating opportunities for growth.
              Discover difference with a logistics partner that is truly
              invested in your success.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default WhyUs;
