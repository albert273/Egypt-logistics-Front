import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import cookie from "cookie-universal";
import axios from "axios";

export default function DialogSelect({ open, setOpen, id, stepName }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [successMsg, setSuccessMsg] = React.useState("");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  console.log(stepName);

  const onSubmit = async (data) => {
    const cookies = cookie();
    const token = cookies.get("token");
    handleClose();
    try {
      const res = await axios.post(
        `https://egypt-logistics.vercel.app/api/quote/tracking/${stepName}/comment/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccessMsg("Comment added successfully");
        setOpenSuccess(true);
      }
    } catch (err) {
      if (err.response?.data?.errors?.length) {
        setErrorMsg(err.response.data.errors[0].msg);
      }
    }
  };

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    outline: none;
    min-height: 152px;
    max-width: 100%; 
    min-width: 100%;
    width:100%;   
    line-height: 52px;
    font-size: 16px;
    background: #fff;
    border-radius: 12px 12px 0px 12px;
    text-transform: capitalize;
    font-weight: 400;
    font-family: "Outfit", sans-serif;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          outline: 0;
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[600] : blue[200]
          };
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        PaperProps={{
          "aria-hidden": undefined,
          inert: open ? undefined : "true",
          sx: {
            width: "500px",
            transition: ".3s",
          },
        }}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        autoComplete="off"
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
          >
            <Textarea
              aria-label="empty textarea"
              style={{
                borderColor: errors.text ? "red" : "#ccc",
                paddingLeft: "10px", // Add padding for the icon space
              }}
              placeholder="Comment"
              {...register("text", {
                required: "Comment is required",
                validate: {
                  minLength: (value) =>
                    value.length >= 3 ||
                    "Comment must be at least 3 characters",
                },
              })}
              sx={{ flex: 1, marginTop: "10px", position: "relative" }}
            />
            {errors.text && (
              <Box sx={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.text.message}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
