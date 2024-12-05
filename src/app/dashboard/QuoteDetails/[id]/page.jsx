"use client";
import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import cookie from "cookie-universal";
import {
  Email,
  Phone,
  LocationOn,
  Flight,
  Straighten,
  Scale,
  Category,
  AttachMoney,
  CalendarToday,
} from "@mui/icons-material";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuote, fetchQuoteById, finishQuote } from "@/redux/slice/quotes";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Link from "next/link";
import DialogSelectComment from "@/components/dashboard/commentsStep/DialogSelect";

const Page = ({ params }) => {
  const { id } = params;
  const [loaded, setLoaded] = useState(true);
  const [openDialog, setOpenDialog] = useState();
  const [selectedComments, setSelectedComments] = useState([]);

  const cookies = cookie();
  const token = cookies.get("token");

  const dispatch = useDispatch();
  const requestDetails = useSelector((state) => state.Quotes.Quote);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuoteById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteQuote(id));
  };

  const handleFinish = (id) => {
    dispatch(finishQuote(id));
  };

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
    <Box>
      <TitleDash title="Request Details" />
      <Box sx={{ padding: 4 }}>
        <Stack>
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
              <DialpadIcon color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Bill Number:
                </Typography>
                <Typography>{requestDetails?.billNumber || "N/A"}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <DialpadIcon color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  System Number:
                </Typography>
                <Typography>{requestDetails?.systemNumber || "N/A"}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <AttachMoney color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  fees:
                </Typography>
                <Typography>{requestDetails?.fees || "N/A"}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarToday color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Created Date:
                </Typography>
                <Typography>
                  {new Date(requestDetails?.createdAt).toLocaleString() ||
                    "N/A"}
                </Typography>
              </Stack>
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarToday color="primary" sx={{ color: "#dd3333" }} />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Finish Data:
                </Typography>
                <Typography>
                  {new Date(requestDetails?.status?.[0]?.finishedAt).toLocaleString() ||
                    "The Quote in progress"}
                </Typography>
              </Stack>
            </Stack>
            
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"end"}
            gap={3}
          >
            <Button
              onClick={() => handleDelete(requestDetails?.id)}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#e53935",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#b71c1c" },
                mt: "20px",
              }}
            >
              delete Quote
            </Button>
            <Link href={`/dashboard/UpdateQuote/${requestDetails?.id}`}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#fdd835",
                  padding: {
                    xs: "8px 12px",
                    sm: "10px 16px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
                  "&:hover": { backgroundColor: "#ff9700" },
                  mt: "20px",
                }}
              >
                Update
              </Button>
            </Link>
            <Link href={`/dashboard/CreateTracking/${requestDetails?.id}`}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#fdd835",
                  padding: {
                    xs: "8px 12px",
                    sm: "10px 16px",
                  },
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "16px",
                  transition: ".3s",
                  "&:hover": { backgroundColor: "#ff9700" },
                  mt: "20px",
                }}
              >
                Tracking
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={() => handleFinish(id)}
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#00695c",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                "&:hover": { backgroundColor: "#004d40" },
                mt: "20px",
              }}
            >
              finish
            </Button>
          </Stack>
        </Stack>
        <TitleDash title={"Tracking"} />
        <Grid
          container
          sx={{
            margin: "auto",
            width: "90%",
            gap: "20px",
            justifyContent: { xs: "start", sm: "center" },
            overflow: { xs: "auto", sm: "visible" },
            flexWrap: { xs: "nowrap", sm: "wrap" },
          }}
        >
          {Object.entries(requestDetails?.tracking?.[0] || {})
            .filter(([key, value]) => value?.isActive) // Filter for active steps
            .map(([stepName, stepData], index) => (
              <Stack
                key={index}
                sx={{
                  padding: "20px",
                  border: "2px solid gray",
                  borderRadius: "10px",
                  width: "300px",
                  minWidth: "300px",
                  height: "350px",
                }}
                justifyContent={"space-around"}
              >
                <Typography
                  sx={{
                    color: "#dd3333",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {stepName.charAt(0).toUpperCase() + stepName.slice(1)}
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  sx={{ marginTop: "20px" }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Condition:
                  </Typography>
                  <Typography>Activate</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  sx={{ marginTop: "10px" }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Complete:
                  </Typography>
                  <Typography>
                    {stepData.isCompleted ? "Completed" : "Not Completed"}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  sx={{ marginTop: "10px" }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Complete Date:
                  </Typography>
                  <Typography>
                    {stepData.completedDate || "Not Available"}
                  </Typography>
                </Stack>
                {stepData.isCompleted ? (
                  <Box>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      sx={{ marginTop: "10px" }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        User Completed:
                      </Typography>
                      <Typography>
                        {stepData.completedBy?.name || "Not Available"}
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}

                <Stack>
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      marginX: "auto",
                      backgroundColor: "#dd3333",
                    }}
                    onClick={() => {
                      setSelectedComments(stepData.comment || []); // Ensure it's an array
                      setOpenDialog(true);
                    }}
                  >
                    Comments
                  </Button>
                  <DialogSelectComment
                    open={openDialog}
                    setOpen={setOpenDialog}
                    comments={selectedComments}
                  />
                </Stack>
              </Stack>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Page;
