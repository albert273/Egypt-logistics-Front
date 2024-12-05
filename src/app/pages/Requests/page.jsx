"use client";
import HeroPages from "@/components/heroPage/Hero";
import React from "react";
import image from "../../../../public/images/requests/import-export-1024.webp";
import { Box, Container, Stack } from "@mui/system";
import RequestsCard from "@/components/requests/RequestsCard";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import cookie from "cookie-universal";
import Image from "next/image";
import img from "../../../../public/images/requests/shoe-box-clipart-2.jpg";

const page = () => {
  const [userRequest, setUserRequest] = useState(); // Default to empty array
  const [loaded, setLoaded] = useState(false);

  const cookies = cookie();
  const token = cookies.get("token");
  useEffect(() => {
    const fetchData = async () => {
      const cookies = cookie();
      const token = cookies.get("token");
      const id = cookies.get("id");
      try {
        const response = await axios.get(
          `https://egypt-logistics.vercel.app/api/quote/clientQuote/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return setUserRequest(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response || error.message
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);
  console.log(userRequest);

  if (!loaded)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#dd3333" }} />
      </Box>
    );
  if (!token)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#dd3333" }} />
      </Box>
    );
  return (
    <>
      <HeroPages title={"Requests"} image={image} />
      <Box sx={{ minHeight: "100vh", paddingTop: "60px" }}>
        <Container maxWidth={false} sx={{ width: "90%" }}>
          {userRequest?.length === 0 ? (
            <Stack justifyContent={"center"} alignItems={"center"} gap={3}>
              <Image src={img} alt="empty box" width={600} height={400} />{" "}
              <Typography
                sx={{
                  fontSize: "2.4rem",
                  fontWeight: "bold",
                  color: "#dd3333",
                }}
              >
                {" "}
                Sorry but you don't have any requests.
              </Typography>
            </Stack>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                justifyItems: "center",
                alignItems: "center",
                gap: 2,
                pb: "40px",
              }}
            >
              {userRequest?.map((item) => {
                // Extract finishedAt from the latest status (assuming only one status object exists)
                const finishedAt = item.status?.[0]?.finishedAt
                  ? new Date(item.status[0].finishedAt).toLocaleDateString()
                  : "N/A";

                return (
                  <RequestsCard
                    key={item.id}
                    createdAt={new Date(item.createdAt).toLocaleDateString()}
                    importingCountry={item.importingCountry}
                    exportingCountry={item.exportingCountry}
                    name={item.name}
                    email={item.email}
                    phoneNumber={item.phoneNumber}
                    id={item.id}
                    status={item.status}
                    finishedAt={finishedAt}
                  />
                );
              })}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default page;
