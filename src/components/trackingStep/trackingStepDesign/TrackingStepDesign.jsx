import { Box, Container, Stack, IconButton, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Flight, ArrowBack, ArrowForward } from "@mui/icons-material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TrackingStepCard from "../trackingStepCard/TrackingStepCard";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import LaptopIcon from "@mui/icons-material/Laptop";
import BusinessIcon from "@mui/icons-material/Business";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

// Function to generate icons dynamically based on the completion status
const getIcons = (isCompleted) => ({
  booked: (
    <LaptopIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  receiving: (
    <BusinessIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  departed: (
    <Flight
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  arrived: (
    <AssignmentTurnedInIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  notified: (
    <MarkEmailUnreadIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  customers: (
    <EmojiEmotionsIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
  shipping: (
    <LocalShippingIcon
      sx={{ fontSize: "3.2rem", color: isCompleted ? "white" : "#dd3333" }}
    />
  ),
});

function TrackingStepDesign({ steps }) {
  const [startIndex, setStartIndex] = useState(0);
  const stepsRef = useRef(null);

  // Responsive breakpoints
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  
  // Dynamically set the number of visible steps
  const stepsToShow = isSmallScreen ? 1 : isMediumScreen ? 2 : 4;

  const slideSteps = (direction) => {
    if (
      (direction === "next" && startIndex + stepsToShow < steps.length) ||
      (direction === "prev" && startIndex > 0)
    ) {
      const nextIndex = direction === "next" ? startIndex + 1 : startIndex - 1;

      // Animate the steps container
      const stepWidth = stepsRef.current?.children[0]?.offsetWidth || 0;

      gsap.to(stepsRef.current, {
        x: direction === "next" ? `-${stepWidth}px` : `${stepWidth}px`,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Update visible steps after animation
          setStartIndex(nextIndex);

          // Reset the position for seamless looping
          gsap.set(stepsRef.current, { x: "0%" });
        },
      });
    }
  };

  const visibleSteps = steps.slice(startIndex, startIndex + stepsToShow);

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        paddingTop: "100px",
        paddingBottom: "70px",
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "90%" }}>
        <Stack sx={{ display: "flex", justifyContent: "center" }} gap={4}>
          <Box
            mt={4}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={() => slideSteps("prev")}
              disabled={startIndex === 0}
              sx={{
                position: "absolute",
                left: "20px",
                zIndex: 100,
                backgroundColor: "#fff",
                boxShadow: 1,
                "&:disabled": {
                  opacity: 0.5,
                },
              }}
            >
              <ArrowBack />
            </IconButton>

            <Stack
              ref={stepsRef}
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                transform: "translateX(0%)",
                willChange: "transform",
              }}
            >
              {visibleSteps.map((step, index) => (
                <TrackingStepCard
                  key={index}
                  logo={getIcons(step.isCompleted)[step.name]}
                  name={step.name.charAt(0).toUpperCase() + step.name.slice(1)}
                  completedDate={step.completedDate}
                  comments={step.comments}
                  isCompleted={step.isCompleted}
                />
              ))}
            </Stack>

            <IconButton
              onClick={() => slideSteps("next")}
              disabled={startIndex + stepsToShow >= steps.length}
              sx={{
                position: "absolute",
                right: "20px",
                zIndex: 10,
                backgroundColor: "#fff",
                boxShadow: 1,
                "&:disabled": {
                  opacity: 0.5,
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default TrackingStepDesign;
