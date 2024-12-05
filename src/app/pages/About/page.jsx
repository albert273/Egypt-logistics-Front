import { Box } from "@mui/material";
import React from "react";
import WhyUs from "@/components/about/WhyUs";
import WhyChoose from "@/components/about/WhyChoose";
import OurValues from "@/components/about/OurValues";
import HeroPages from "@/components/heroPage/Hero";
import delivery from "../../../../public/images/about/ss.png";

export default function Page() {
  return (
    <Box>
        <HeroPages title={"About Us"} image={delivery}/>
        <WhyUs />
        <WhyChoose />
        <OurValues />
    </Box>
  );
}
