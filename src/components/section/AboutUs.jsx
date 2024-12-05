import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo2 from "../../../public/images/log0_page-0001.jpg";
import logo from "../../../public/images/log0_page-0001.jpg";
import Link from "next/link";

function AboutUs() {
  return (
    <Box sx={{ backgroundColor: "#f2f2f2", paddingY: "60px" }}>
      <Container maxWidth={false} sx={{ maxWidth: "80%" }}>
        <Stack
          alignItems={"center"}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#dd3333",
                fontSize: "56px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              About Egypt Logistics
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#777777",
                lineHeight: "28px",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Welcome to Egypt Logistics, your trusted partner in global freight
              and logistics solutions. Since our founding in 2011, we have grown
              into a leading logistics provider, specializing in sea, air, road,
              and rail transportation. With a team of highly qualified
              specialists and FIATA-certified experts, we deliver integrated,
              end-to-end solutions tailored to meet the diverse
              needs of our clients.
            </Typography>
            <Link href={"/pages/About"}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#dd3333",
                  padding: {
                    xs: "12px 16px",
                    sm: "16px 24px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
                  "&:hover": { backgroundColor: "black" },
                }}
              >
                learn more
              </Button>
            </Link>
          </Box>
          <Box>
            <Image src={logo} alt="logo" />
          </Box>
        </Stack>

        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            display: { xs: "flex", md: "none" },
          }}
        >
          <Box>
            <Image src={logo2} alt="logo" />
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#dd3333",
                fontSize: "32px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              About Egypt Logistics
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#777777",
                lineHeight: "22px",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Welcome to Egypt Logistics, your trusted partner in global freight
              and logistics solutions. Since our founding in 2011, we have grown
              into a leading logistics provider, specializing in sea, air, road,
              and rail transportation. With a team of highly qualified
              specialists and FIATA-certified experts, we deliver integrated,
              end-to-end solutions tailored to meet the diverse
              needs of our clients.
            </Typography>
            <Link href={"/pages/About"}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#dd3333",
                  padding: {
                    xs: "12px 16px",
                    sm: "16px 24px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
                  "&:hover": { backgroundColor: "black" },
                }}
              >
                learn more
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutUs;
