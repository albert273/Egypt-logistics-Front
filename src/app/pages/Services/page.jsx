import CardService from "@/components/services/CardService";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import customerImage from "../../../../public/images/service/WhatsApp-Image-2022-11-16-at-2.19.31-AM.jpeg";
import seaImage from "../../../../public/images/service/post-09.jpg";
import AirImage from "../../../../public/images/service/post-07.jpg";
import DGImage from "../../../../public/images/service/X15-scaled.jpg";
import InlandImage from "../../../../public/images/service/minsk-belarus-march-2020-trucks-row-with-containers-parking-lot-logistic-transport-concept.jpg";
import WarehousingImage from "../../../../public/images/service/WhatsApp-Image-2022-11-16-at-2.22.13-AM (1).jpeg";
import CargoImage from "../../../../public/images/service/empty-warehouse-storage-distribution-centers.jpg";
import delivery from "../../../../public/images/about/ss.png";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import WidgetsSharpIcon from "@mui/icons-material/WidgetsSharp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SecurityIcon from "@mui/icons-material/Security";
import HeroPages from "@/components/heroPage/Hero";
const section1 = [
  {
    id: "1",
    title: "Custom Clearance",
    description:"Comprehensive customs brokerage services for smooth import and export clearance. Expertise in navigating complex regulations and documentation requirements. Minimizing delays and compliance risks for your shipments.",
    img: customerImage,
    icon: <GroupIcon sx={{ fontSize: 50 }} />,
  },
  {
    id: "2",
    title: "Ocean Freight (LCL & FCL)",
    description:"Cost-effective solutions for both Less-than-Container Load (LCL) and Full-Container Load (FCL) shipments. Extensive global network of carriers for competitive rates and reliable schedules. Expertise in handling various types of cargo.",
    img: seaImage,
    icon: <DirectionsBoatIcon sx={{ fontSize: 50 }} />,
  },
  {
    id: "3",
    title: "Air Freight",
    description:"Fast and reliable solutions for time-sensitive cargo. Flexible options for express, standard, and consolidated air shipments. End-to-end tracking for complete visibility and control",
    img: AirImage,
    icon: <FlightTakeoffIcon sx={{ fontSize: 50 }} />,
  },
  {
    id: "4",
    title: "Trucking & Road Transportation",
    description:"Domestic and cross-border trucking services tailored for both small and large shipments. Dedicated fleet and partnerships for efficient, timely deliveries. Specialized trucking services for temperature-sensitive and delicate goods.",
    img: DGImage,
    icon: <LocalShippingIcon sx={{ fontSize: 50 }} />,
  },
];

const section2 = [
  {
    id: "1",
    title: "Garments on Hangers (G.O.H)",
    description:"Specialized handling and transportation for the fashion and textile industry. Ensuring garments arrive wrinkle-free and ready for retail display. Efficient re-export and distribution services.",
    img: CargoImage,
    icon: <WarehouseIcon sx={{ fontSize: 50 }} />,
  },
  {
    id: "2",
    title: "Re-Export Services",
    description:"Handling complex re-export processes for goods that require temporary importation. Expertise in managing documentation and compliance for re-export operations. Efficient service to reduce turnaround time and costs",
    img: WarehousingImage,
    icon: <SecurityIcon sx={{ fontSize: 50 }} />,
  },
];
function Page() {
  return (
    <Box>
      <HeroPages title={"Services"} image={delivery} />
      <Container sx={{ marginTop: "40px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "2fr 2fr",
              md: "2fr 2fr 1fr",
            },
            justifyItems: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {section1.map((item) => (
            <Box key={item.id} sx={{ marginX: "auto" }}>
              <CardService
                title={item.title}
                description={item.description}
                icon={item.icon}
                img={item.img}
              />
            </Box>
          ))}
        </Box>
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: "20px" }}>
          Value added services
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "2fr", sm: "1fr 1fr 1fr" },
            justifyItems: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {section2.map((item) => (
            <Box key={item.id} sx={{ marginX: "auto" }}>
              <CardService
                title={item.title}
                description={item.description}
                icon={item.icon}
                img={item.img}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Page;
