import HeroPages from "@/components/heroPage/Hero";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import image2 from "../../../../../public/images/industries/animal2_.png";
import image from "../../../../../public/images/industries/animal3.jpg";

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
      Live animals
      <br /> transportation
    </Typography>
  );
  return (
    <Box>
      <HeroPages
        title={title}
        link={"Live animals transportation"}
        image={image2}
        imageSize={{ width: 580, height: 330 }}
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
          Live Animal transportation is considered a complex task, since
          inappropriate handling may cause tragic results. And since Air is the
          most humane and expedient method of transportation over long
          distances, Uni Cargo International has successfully managed moving live
          animal shipments in accordance with IATA regulations. We have moved
          pets, day-old chicks and horses with great consideration of the
          specific requirements that ensure their safety and welfare while being
          transported by air
        </Typography>
        <Image src={image} alt="img" width={500} height={500} />
      </Stack>
    </Box>
  );
};

export default page;
