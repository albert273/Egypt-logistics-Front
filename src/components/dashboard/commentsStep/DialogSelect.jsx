import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";

export default function DialogSelectComment({ open, setOpen, comments }) {
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };


  return (
    <>
      <Dialog
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            width: "1000px",
            transition: ".3s",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>comments</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Stack
                  key={comment.id}
                  marginBottom="20px"
                  sx={{
                    borderBottom: "1px black solid",
                    maxWidth: "100%",
                    minWidth: "300px", // Add a reasonable minimum width
                    width: "auto", // Allow the width to adjust dynamically
                    wordWrap: "break-word", // Ensure long words break to the next line
                  }}
                >
                  <Typography>{comment.text}</Typography>
                  <Stack justifyContent="flex-end">
                    <Typography
                      sx={{
                        color: "grey",
                        textAlign: "end",
                      }}
                    >
                      {comment.commentedBy?.name || "Anonymous"}
                    </Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Typography>No comments available.</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
