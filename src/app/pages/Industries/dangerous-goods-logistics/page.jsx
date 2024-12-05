import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "../../../../../public/images/industries/danger2-1.png";
import danger from "../../../../../public/images/industries/danger.png";
import CircleIcon from "@mui/icons-material/Circle";

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
      Dangerous
      <br /> goods logistics
    </Typography>
  );
  return (
    <Box>
      <HeroPages
        title={title}
        link={"Dangerous goods logistics"}
        image={danger}
        imageSize={{ width: 300, height: 300 }}
      />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={"center"}
        sx={{ marginY: "80px", marginX: {xs:"30px",lg:"200px"} }}
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
          Uni Cargo International is specialized in moving dangerous goods with
          integrated solutions and comprehensive services:
          <br />
          <CircleIcon sx={{ fontSize: ".5rem" }} /> Uni Cargo Int. provides
          necessary packing materials that comply with IATA International
          transport rules.
          <br />
          <CircleIcon sx={{ fontSize: ".5rem" }} /> Uni Cargo Int. moves
          dangerous shipments by Air and Sea.
          <br />
          <CircleIcon sx={{ fontSize: ".5rem" }} /> Uni Cargo Int. has an
          experienced certified team.
          <br />
          <CircleIcon sx={{ fontSize: ".5rem" }} /> Uni Cargo Int. provides
          custom clearance for import and export DG shipments.
          <br />
          <CircleIcon sx={{ fontSize: ".5rem" }} /> Uni Cargo Int. manages a
          swift and quick DG shipments movement starting with shipment pick up
          from client’s premises, packing, marking, labeling, custom clearance
          and airlines or sea lines booking and reservation. Uni Cargo Int.
          provides dry ice
        </Typography>
        <Image src={image} alt="img" width={500} height={300} />
      </Stack>
    </Box>
  );
};

export default page;
