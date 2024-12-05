import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import cookie from "cookie-universal";
import axios from "axios";
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function DialogSelectDate({ open, setOpen, id, stepName }) {
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

  const onSubmit = async (data) => {
    const cookies = cookie();
    const token = cookies.get("token");
    handleClose();
    try {
      const res = await axios.patch(
        `https://egypt-logistics.vercel.app/api/quote/tracking/${stepName}/completedStepDate/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        setSuccessMsg("Date added successfully");
        setOpenSuccess(true);
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data?.errors?.length) {
        setErrorMsg(err.response.data.errors[0].msg);
      }
    }
  };

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
            <TextField
              type="date"
              id={`completedDate`}
              label="Completed Date"
              error={Boolean(errors.completedDate)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon sx={{ color: "#dd3333" }} />
                  </InputAdornment>
                ),
              }}
              helperText={
                errors.completedDate ? errors.completedDate.message : null
              }
              {...register("completedDate", {
                required: "Completed date is required",
              })}
              sx={{ color: "black", mt: "20px" }}
            />
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
