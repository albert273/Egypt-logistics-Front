import DialogSelectComment from "@/components/dashboard/commentsStep/DialogSelect";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const TrackingStepCard = ({
  logo,
  name,
  completedDate,
  comments,
  isCompleted,
}) => {
  const [openDialog, setOpenDialog] = useState();
  const [selectedComments, setSelectedComments] = useState([]);

  return (
    <Stack
      sx={{
        height: "330px",
        width: "250px",
        backgroundColor: isCompleted ? "#dd3333" : "#ffebee",
        borderRadius: "40px",
        padding: "20px",
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack gap={1} alignItems={"center"}>
        <Box sx={{ color: isCompleted ? "white" : "#dd3333" }}>{logo}</Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: isCompleted ? "white" : "#dd3333",
            fontSize: "1.2rem",
          }}
        >
          {name}
        </Typography>
      </Stack>
      <Stack gap={2} alignItems={"center"}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: isCompleted ? "white" : "#dd3333",
            fontSize: "1.2rem",
          }}
        >
          {completedDate}
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: isCompleted ? "white" : "#dd3333",
            padding: {
              xs: "8px 12px",
              sm: "10px 16px",
            },
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "16px",
            transition: ".3s",
            color: isCompleted ? "#dd3333" : "white",
            "&:hover": { backgroundColor: isCompleted ? "#fff" : "#b71c1c" },
          }}
          onClick={() => {
            setSelectedComments(comments || []); // Ensure it's an array
            setOpenDialog(true);
          }}
        >
          comments
        </Button>
        <DialogSelectComment
          open={openDialog}
          setOpen={setOpenDialog}
          comments={selectedComments}
        />
      </Stack>
    </Stack>
  );
};

export default TrackingStepCard;
