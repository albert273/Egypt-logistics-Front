import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image from "../../../../../public/images/industries/food.jpg";

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
      General Cargo <br />Transportation
    </Typography>
  );
  return (
    <Box>
      <HeroPages
        title={title}
        link={"General Cargo Transportation"}
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
          Uni Cargo International provides a wide range of transport services,
          including General cargo transportation. We have more than 15 years of
          experience in organizing the delivery of goods by sea, air and road.
          We make cargo transportation under INCOTERMS conditions – from DDP,
          DDU, FCA, FOB, to EXW. General cargo are items that do not fall into
          the Special Cargo categories and that do not require any extra
          precautions or time sensitive or special handling during air, sea and
          land transport. Also with correct and accurate packing, labeling and
          marking we can maintain less shipments movement expenses. General
          cargo types include retail and most consumer goods such as, furniture,
          dry goods, hardware, textiles, machinery and more. These are goods
          that are transported in boxes, bags, big bags, containers, as well as
          various piece loads. Very often they are delivered as part of
          consolidated shipments.
        </Typography>
        <Image src={image} alt="img" width={600} height={500} />
      </Stack>
    </Box>
  );
};

export default page;
