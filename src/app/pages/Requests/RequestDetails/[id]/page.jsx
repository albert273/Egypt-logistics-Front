"use client";
import HeroPages from "@/components/heroPage/Hero";
import { Box, Typography, Paper, Stack, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie-universal";
import {
  Email,
  CheckCircle,
  Phone,
  LocationOn,
  Flight,
  Straighten,
  Scale,
  Category,
  AttachMoney,
  CalendarToday,
} from "@mui/icons-material";
import TrackingStepDesign from "@/components/trackingStep/trackingStepDesign/TrackingStepDesign";

const Page = ({ params }) => {
  const { id } = params;
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const cookies = cookie();
  const token = cookies.get("token");
  useEffect(() => {
    const fetchData = async () => {
      const cookies = cookie();
      const token = cookies.get("token");
      try {
        const response = await axios.get(
          `https://egypt-logistics.vercel.app/api/quote/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequestDetails(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching request details:",
          error.response || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
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
  }
  console.log(requestDetails);
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
    <Box>
      <HeroPages title="Request Details" secondPath="Request Details" />
      <Box sx={{ padding: 4 }}>
        <Paper sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#dd3333", paddingY: "40px" }}
          >
            Request Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              justifyItems: "space-between",
              alignItems: "self-start",
              gap: 4,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Category color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Name:
                </Typography>
                <Typography>{requestDetails?.name || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Email color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Email:
                </Typography>
                <Typography>{requestDetails?.email || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Phone color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Phone Number:
                </Typography>
                <Typography>{requestDetails?.phoneNumber || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocationOn color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Exporting Country:
                </Typography>
                <Typography>
                  {requestDetails?.exportingCountry || "N/A"}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocationOn color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Importing Country:
                </Typography>
                <Typography>
                  {requestDetails?.importingCountry || "N/A"}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Flight color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Trip Type:
                </Typography>
                <Typography>{requestDetails?.tripType || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Straighten color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Dimensions:
                </Typography>
                <Typography>
                  Width: {requestDetails?.width || "N/A"} m, Height:{" "}
                  {requestDetails?.height || "N/A"} m, Length:{" "}
                  {requestDetails?.lenght || "N/A"} m
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Scale color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Weight:
                </Typography>
                <Typography>{requestDetails?.weight || "N/A"} kg</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Category color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Goods Type:
                </Typography>
                <Typography>{requestDetails?.goodsType || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <AttachMoney color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Amount:
                </Typography>
                <Typography>{requestDetails?.amount || "N/A"}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarToday color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Date:
                </Typography>
                <Typography>
                  {new Date(requestDetails?.createdAt).toLocaleString() ||
                    "N/A"}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <AttachMoney color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Fees:
                </Typography>
                <Typography>
                  {requestDetails?.fees || "Fees not specified yet"}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Phone color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Bill Number:
                </Typography>
                <Typography>
                  {requestDetails?.billNumber ||
                    "Bill Number not specified yet"}
                </Typography>
              </Stack>
            </Stack>

            {requestDetails?.status?.[0]?.isFinished ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircle color="primary" sx={{ color: "#dd3333" }} />
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    finished Date:
                  </Typography>
                  <Typography>
                    {requestDetails?.status?.[0]?.finishedAt}
                  </Typography>
                </Stack>
              </Stack>
            ) : null}
          </Box>
          <Stack sx={{ marginTop: "40px" }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.6rem", color: "#dd3333" }}
            >
              Track Steps
            </Typography>
            {requestDetails?.tracking?.length > 0 && (
              <TrackingStepDesign
                steps={Object.entries(requestDetails.tracking[0])
                  .filter(([key, value]) => value.isActive)
                  .map(([key, value]) => ({
                    name: key,
                    isCompleted: value.isCompleted,
                    completedDate: value.completedDate,
                    comments: value.comment,
                  }))}
              />
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Page;
