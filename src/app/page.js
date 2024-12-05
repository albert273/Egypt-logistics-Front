"use client";
import DashIcon from "@/components/dashboardIcon/DashIcon";
import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/section/AboutUs";
import Section1 from "@/components/section/Section1";
import Section2 from "@/components/section/Section2";
import { Box } from "@mui/material";
import cookie from "cookie-universal";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";

export default function HomePage() {

  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#dd3333", fontSize: "3rem" }} />
      </Box>
    );
  }
  return (
    <Box>
      <Navbar />
      <DashIcon />
      <Hero />
      <Section1 />
      <AboutUs />
      <Section2 />
      <Footer />
    </Box>
  );
}
