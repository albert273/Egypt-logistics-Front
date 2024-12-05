import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import image1 from "../../../public/images/hero/ca-dot-shape4.1.png";
import image2 from "../../../public/images/hero/container-3552869.jpg";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <Stack
      sx={{
        width: "100vw",
        height: { xs: "600px", md: "770px" },
        background: "#222222",
        position: "relative",
        zIndex: 1,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ width: "48vw", height: "900px", marginTop: "100px" }}>
        <Image src={image1} width={"100vw"} height={480} alt="background2"/>
        <Box sx={{ position: "absolute", top: "30%", left: "5%" }}>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "50px",
              fontWeight: 400,
              opacity: "0.6",
              marginBottom: "10px",
            }}
          >
             Egypt Logistics
          </Typography>

          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "40px",
            }}
          >
            The Art of Logistics
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={4}>
          <Link href={'/pages/UserQuote'}>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#dd3333",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
            >
              Get A Quote
            </Button>
            </Link>
            <Link href={"/pages/About"}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#dd3333",
                  padding: {
                    xs: "8px 12px",
                    sm: "10px 16px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                Learn More
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <Image src={image2} width={850} height={770} alt='background' />
      </Box>
    </Stack>
  );
}

export default Hero;
