import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "../../../../../public/images/industries/medicamentos2.jpg";
import image2 from "../../../../../public/images/industries/medicamentos1.png";

const page = () => {
  const title = (
    <Typography
      sx={{
        color: "#ffffff",
        marginBottom: "20px",
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: { xs: "45px", md: "62px" },
        paddingLeft: { xs: "20px", md: 0 },
      }}
    >
      Pharmaceutical
    </Typography>
  );
  return (
    <Box>
      <HeroPages
        title={title}
        link={"Pharmaceutical"}
        image={image2}
        imageSize={{ width: 450, height: 330 }}
      />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={"center"}
        sx={{ marginY: "100px", marginX: {xs:"30px",lg:"200px"} }}
        gap={5}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "28px",
            color: "#777777",
            marginBottom: "20px",
            
          }}
        >
          Time and temperature controlled pharmaceutical products such as
          vaccines, medicines and other healthcare products need rigorous
          logistical approach. Uni cargo cargo International has an extensive
          experience in pharmaceutical transportation and familiar with all
          legal regulations concerning the transport of drugs including specific
          product requirements. Our dedicated team is fully aware of the time
          sensitivity of the products and the necessity of safe and swift
          arrival at destination. Being a member of a powerful network, Uni
          Cargo International has fast access to companies and pharma supply
          chain representatives across the world that allows us to offer
          comprehensive end-to-end supply chain solutions for the healthcare and
          pharmaceutical sector.
        </Typography>
        <Image src={image} alt="img" width={500} height={350} />
      </Stack>
    </Box>
  );
};

export default page;
