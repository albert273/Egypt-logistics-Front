import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import DirectionsBoatFilledSharpIcon from "@mui/icons-material/DirectionsBoatFilledSharp";

const box = [
  {
    id: "1",
    title: "Air freight",
    logo: (
      <AirplanemodeActiveIcon
        sx={{
          width: "75px",
          height: "75px",
          marginBottom: "15%",
          color: "#dd3333",
          marginX: "auto",

        }}
      />
    ),
  },
  {
    id: "2",
    title: "Sea freight",
    logo: (
      <DirectionsBoatFilledSharpIcon
        sx={{
          width: "75px",
          height: "75px",
          marginBottom: "15%",
          color: "#dd3333",
          marginX: "auto",
        }}
      />
    ),
  },
  {
    id: "3",
    title: "Inland freight",
    logo: (
      <LocalShippingSharpIcon
        sx={{
          width: "75px",
          height: "75px",
          marginBottom: "15%",
          color: "#dd3333",
          marginX: "auto",
        }}
      />
    ),
  },
];

export default function Section1() {
  return (
    <Container
      sx={{
        marginTop: { xs: "50px", md: "0" },
        display: "flex",
        justifyContent: "center",
        position: "relative",
        marginBottom: {xs: "950px", md:"300px"}
      }}
    >
      <Stack
        alignItems={"center"}
        gap={4}
        justifyContent="center" // Center content vertically within the Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          zIndex: 2,
          position: "absolute",
          top: {xs: 0,md:-40}
        }}
      >
        {box.map((item) => (
          <Box
            key={item.id}
            sx={{
              padding: "20px",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                "& .hover-border": {
                  borderColor: "#dd3333", // Change the border color on hover
                },
              },
              cursor: "pointer",
              width: {xs: "300px",md:"450px"},
              transition: "0.3s",
              backgroundColor: "white",
            }}
          >
            <Stack
              className="hover-border"
              sx={{
                border: "2px solid #f3f3f3",
                padding: "48px 40px 40px",
                justifyContent: "center",
                marginX: "auto",
                marginY: "auto",
                transition: "border-color 0.3s",
              }}
            >
              {item.logo}
              <Typography
                sx={{
                  color: "black",
                  fontSize: {xs: "28px",md:"32px"},
                  marginX: "auto",
                  fontWeight: "100",
                  "&:hover": { color: "#dd3333" },
                  transition: "color 0.3s",
                }}
              >
                {item.title}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
