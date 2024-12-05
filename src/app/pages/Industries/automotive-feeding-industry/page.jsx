import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "../../../../../public/images/industries/parts-background.jpg";
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
      Automotive
      <br /> Feeding Industry
    </Typography>
  );
  return (
    <Box sx={{}}>
      <HeroPages title={title} link={"Automotive Feeding Industry"} />
      <Stack direction={{xs:'column',lg:'row'}} alignItems={'center'} sx={{marginY: "60px", marginX: {xs:"30px",lg:"200px"}}} gap={5}>
        <Typography sx={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "28px",
            color: "#777777",
            marginBottom: "20px",
        }}>
          Considering the package of incentives the Egyptian government is
          offering to promote local production of vehicles and its feeding
          industries, we as a freight forwarder is backing this promotion
          through our freight services, custom clearance services and delivery
          to the automotive factories. Competition is intense in the automotive
          and feeding industry, accordingly they would prefer to work with a
          trusted freight forwarder to maintain both their quality and
          profitability. We at DGL International has a total comprehension of
          the importance of timing in the automotive industry. Therefore, our
          team is fully aware of all legal regulations and requirements and able
          to handle all customs paperwork and processes it with ease. Together
          with just in time delivery process to keep auto and feeding production
          rolling assembly. A dedicated staff will keep client precisely
          informed on where cargo is and exactly when it will arrive and deliver
          thereby ensuring assembly lines stay in operation.
        </Typography>
        <Image src={image} alt="img" width={500} height={500}/>
      </Stack>
    </Box>
  );
};

export default page;
