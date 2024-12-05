"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import axios from "axios";
import cookie from "cookie-universal";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessageData } from "@/redux/slice/MessageSlice";
import { useEffect } from "react";

export default function Message() {
  const [loaded, setLoaded] = React.useState(false);

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.MessageData.messages);

  useEffect(() => {
    dispatch(fetchMessageData());
  }, [dispatch]);

  const acceptedMessage = async (id) => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.patch(
        `https://egypt-logistics.vercel.app/api/message/acceptedMessage/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.status === 201) | 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

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
  return (
    <>
      <TitleDash title={"Messages"} subTitle={"Messages of Client"} />
      <Stack gap={4}>
        <Stack gap={2}>
          {messages
            ?.filter((item) => !item.accepted) // Filter only unaccepted messages
            .map((item) => (
              <Accordion key={item._id}>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      color: "text.secondary",
                    }}
                  >
                    {item.email}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      color: "text.secondary",
                    }}
                  >
                    {item.phoneNumber}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.message}</Typography>
                </AccordionDetails>
                <AccordionDetails
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ color: "#dd3333" }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#dd3333",
                      padding: "10px 16px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "16px",
                      transition: ".3s",
                      "&:hover": { backgroundColor: "black" },
                      width: "10%",
                    }}
                    onClick={() => acceptedMessage(item._id)}
                  >
                    Done
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
        <Box>
          <Typography
            variant="h5"
            sx={{ color: "#dd3333", fontWeight: "bold" }}
          >
            Messages Accepted
          </Typography>
        </Box>
        <Stack gap={2}>
          {messages
            ?.filter((item) => item.accepted === true) // Filter only accepted messages
            .map((item) => (
              <Accordion key={item._id}>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      color: "text.secondary",
                    }}
                  >
                    {item.email}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      color: "text.secondary",
                    }}
                  >
                    {item.phoneNumber}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.message}</Typography>
                </AccordionDetails>
                <AccordionDetails
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#dd3333",
                      padding: "10px 16px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "16px",
                      transition: ".3s",
                      "&:hover": { backgroundColor: "black" },
                      width: "10%",
                    }}
                    onClick={() => acceptedMessage(item._id)}
                  >
                    Done
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
      </Stack>
    </>
  );
}
