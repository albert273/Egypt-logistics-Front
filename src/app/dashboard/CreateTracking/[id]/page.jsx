"use client";
import {
  Alert,
  Box,
  Card,
  Snackbar
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeTrackingSteps,
  completedTrackingSteps,
  fetchQuoteById,
  notActiveTrackingSteps,
} from "@/redux/slice/quotes";
import { CardContent, Typography, Stack, Divider, Button } from "@mui/material";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import DialogSelect from "@/components/dashboard/addCommenttToStep/DialogSelect";
import DialogSelectDate from "@/components/dashboard/stepFinishDate/DialogSelectDate";

const validSteps = [
  { id: "1", name: "booked" },
  { id: "2", name: "receiving" },
  { id: "3", name: "departed" },
  { id: "4", name: "arrived" },
  { id: "5", name: "notified" },
  { id: "6", name: "customers" },
  { id: "7", name: "shipping" },
];

export default function Page({ params }) {
  const { id } = params;
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState({ open: false, stepName: "" });
  const [OpenDialogDate, setOpenDialogDate] = useState({ open: false, stepName: "" })
  const dispatch = useDispatch();
  const Quote = useSelector((state) => state.Quotes.Quote);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuoteById(id));
    }
  }, [dispatch, id]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleActive = (data) => dispatch(activeTrackingSteps(data));
  const handleNotActive = (data) => dispatch(notActiveTrackingSteps(data));
  const handleCompleted = (data) => dispatch(completedTrackingSteps(data));

  const handleCompletedError = (step) => {
    if (Quote?.tracking?.[0]?.[step]?.isActive === false) {
      setErrorMsg("Step is not active");
      setOpen(true);
      return true;
    }
    return false;
  };

  // Filter steps based on active status
  const activatedSteps = validSteps.filter(
    (item) => Quote?.tracking?.[0]?.[item.name]?.isActive
  );
  const inactiveSteps = validSteps.filter(
    (item) => !Quote?.tracking?.[0]?.[item.name]?.isActive
  );



  const renderSteps = (steps, title) => (
    <Box>
      <Typography
        sx={{ color: "#dd3333", fontSize: "1.4rem", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      {steps.map((item) => (
        <Card
          key={item.id}
          sx={{
            width: "100%",
            maxWidth: "550px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: 2,
            mb: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Tracking Step{" "}
              <span style={{ color: "#dd3333", fontWeight: "bold" }}>
                {item.name}
              </span>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary">
                  Activate:
                </Typography>
                {Quote?.tracking?.[0]?.[item.name]?.isActive ? (
                  <Button
                    onClick={() => handleNotActive({ id, step: item.name })}
                    variant="contained"
                    color="error"
                  >
                    Inactive
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleActive({ id, step: item.name })}
                    variant="contained"
                    color="success"
                  >
                    Active
                  </Button>
                )}
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="textSecondary">
                  Complete:
                </Typography>
                {Quote?.tracking?.[0]?.[item.name]?.isCompleted ? (
                  <Button variant="contained" disabled color="error">
                    Completed
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const error = handleCompletedError(item.name);
                      if (!error) handleCompleted({ id, step: item.name });
                    }}
                    variant="contained"
                    color="success"
                  >
                    Complete
                  </Button>
                )}
              </Stack>

              {!Quote?.tracking?.[0]?.[item.name]?.completedDate ? (
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  {Quote?.tracking?.[0]?.[item.name]?.isActive && (
                    <Stack
                      direction="row"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Typography variant="body2" color="textSecondary">
                        Complete Data:
                      </Typography>
                        <Button
                          variant="contained"
                          onClick={() =>
                            setOpenDialogDate({ open: true, stepName: item.name })
                          } // Pass stepName
                        >
                          Date
                        </Button>
                        <DialogSelectDate
                          open={OpenDialogDate?.open}
                          setOpen={(state) =>
                            setOpenDialogDate({ ...OpenDialogDate, open: state })
                          }
                          id={id}
                          stepName={OpenDialogDate?.stepName}
                        />
                      </Stack>
                  )}
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="textSecondary">
                    Complete Data:
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                    {Quote?.tracking?.[0]?.[item.name]?.completedDate}
                  </Typography>
                </Stack>
              )}
              {Quote?.tracking?.[0]?.[item.name]?.isActive && (
                <Stack justifyContent={"center"} sx={{ paddingTop: "20px" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "50%", marginX: "auto" }}
                    onClick={() =>
                      setOpenDialog({ open: true, stepName: item.name })
                    } // Pass stepName
                  >
                    Add comment
                  </Button>
                  <DialogSelect
                    open={openDialog?.open}
                    setOpen={(state) =>
                      setOpenDialog({ ...openDialog, open: state })
                    }
                    id={id}
                    stepName={openDialog?.stepName}
                  />
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <>
      <TitleDash title={"Track Steps"} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          pb: "40px",
        }}
      >
        {/* Activated Steps Section */}
        {renderSteps(activatedSteps, "Activated Steps")}

        {/* Inactive Steps Section */}
        {renderSteps(inactiveSteps, "Inactive Steps")}
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

