import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "../../../../../public/images/industries/page2.jpg";
import CircleIcon from '@mui/icons-material/Circle';
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
      Clinical Trials
      <br /> Samples Logistics
    </Typography>
  );
  return (
    <Box sx={{}}>
      <HeroPages title={title} link={"ClinicalTrials Samples Logistics"} />
      <Stack
        direction={{xs:'column',lg:'row'}}
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
          DGL International has a comprehensive experience and knowledge in
          providing clinical logistics from/to Egypt. Accuracy and speed are the
          key words in handling bio-samples shipments to assure the success of
          the whole trial. This is achieved with the assistance of our devoted
          and reliable team who has the required training and expertise in
          moving specimen shipments safe and sound. DGL International clinical
          logistics services include the following:
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/> Provide temperature controlled packaging including dry ice supply
          service to insure safe and adequate specimen arrival to destination.
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  Provide Data Logger that records and monitor shipment’s temperature
          over a defined period of time.
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  Provide Customs support to quickly move shipments through the often
          complicated clearance process.
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  Coordinate the shipping of specimens from the investigator sites to
          the laboratory then tracks the shipment to ensure timely and safe
          transfer of collected specimens.
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  Procure import/export licenses.
          <br />
          DGL Int. Clinical Trial Packaging & Labeling:
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  DGL Int. offers specialty products such as temperature controlled
          packaging solutions that includes the following:
          <br />
          <CircleIcon sx={{fontSize:".5rem"}}/>  UN3373 Category B packaging
          <br />
        </Typography>
        <Image src={image} alt="img" width={500} height={350} />
      </Stack>
    </Box>
  );
};

export default page;
