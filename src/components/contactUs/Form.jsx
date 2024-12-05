"use client";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import axios from "axios";

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

function Form({ onFormSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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
    width:100%;   
    line-height: 52px;
    font-size: 16px;
    background: #fff;
    border-radius: 12px 12px 0px 12px;
    text-transform: capitalize;
    font-weight: 400;
    font-family: "Outfit", sans-serif;
    padding-left: 20px;
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

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(
        "https://egypt-logistics.vercel.app/api/message",
        data
      );
      if ((res.status === 201) | 200) {
        onFormSubmit("Message sent successfully!", "success");
        reset();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <Stack
      direction={"column"}
      sx={{
        padding: "32px",
        backgroundColor: { xs: "#ffffff", md: "white" },
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          lineHeight: "24px",
          fontWeight: 600,
          color: "#0C0504",
        }}
      >
        Send Us A Message
      </Typography>
      <Typography
        sx={{
          paddingBottom: "24px",
          paddingTop: "16px",
        }}
      >
        As a fellow small business owner, we know the fulfillment that an a best
        to comes from running & own business contact our service to Cargo.
      </Typography>
      <Stack
        gap={4}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        component="form"
        autoComplete="off"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: 4, sm: 0 }}
          s={{ width: "100%" }}
        >
          <TextField
            type="text"
            placeholder="First name"
            style={{
              borderRadius: "7px",
              outline: "none",
              height: "52px",
              width: { xs: "100%", sm: "50%" },
              fontSize: "16px",
              color: "#4A4A49",
              background: "#fff",
              borderRadius: "7px",
              textTransform: "capitalize",
              fontWeight: 400,
              paddingLeft: { xs: "20px", md: "20px" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName ? errors.firstName.message : null}
            {...register("firstName", {
              required: "You must write your first name",
              validate: {
                minLength: (value) =>
                  value.length >= 2 || "Name must be at least 2 characters",
                isNotNumber: (value) =>
                  isNaN(value) ? true : "You must write your first real name",
              },
            })}
          />

          <TextField
            type="text"
            placeholder="Last name"
            sx={{
              borderRadius: "7px",
              outline: "none",
              height: "52px",
              width: { xs: "100%", sm: "50%" },
              lineHeight: "52px",
              fontSize: "16px",
              color: "#4A4A49",
              background: "#fff",
              borderRadius: "7px",
              textTransform: "capitalize",
              fontWeight: 400,
              paddingLeft: { xs: 0, md: "20px" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName ? errors.lastName.message : null}
            {...register("lastName", {
              required: "You must write your last name",
              validate: {
                minLength: (value) =>
                  value.length >= 2 || "Name must be at least 2 characters",
                isNotNumber: (value) =>
                  isNaN(value) ? true : "You must write your real last name",
              },
            })}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 4, sm: 0 }}>
          <TextField
            type="email"
            placeholder="Email"
            style={{
              borderRadius: "7px",
              outline: "none",
              height: "52px",
              width: { xs: "100%", sm: "50%" },
              lineHeight: "52px",
              fontSize: "16px",
              color: "#4A4A49",
              background: "#fff",
              borderRadius: "7px",
              textTransform: "capitalize",
              fontWeight: 400,
              paddingLeft: { xs: 0, md: "20px" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              },
            }}
            error={Boolean(errors.email)}
            helperText={errors.email ? "You should enter your Email" : null}
            {...register("email", {
              pattern: regEmail,
              required: "yuo must enter your email",
            })}
          />

          <TextField
            placeholder="Phone number"
            sx={{
              borderRadius: "7px",
              outline: "none",
              height: "52px",
              width: { xs: "100%", sm: "50%" },
              lineHeight: "52px",
              fontSize: "16px",
              color: "#4A4A49",
              background: "#fff",
              textTransform: "capitalize",
              fontWeight: 400,
              paddingLeft: { xs: 0, md: "20px" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneInTalkIcon />
                  </InputAdornment>
                ),
              },
            }}
            inputProps={{
              inputMode: "numeric", // Ensures numeric input on mobile devices
              pattern: "[0-9]*", // Accepts only numbers
              maxLength: 15, // Optional: limits the length of phone numbers
            }}
            error={Boolean(errors.phoneNumber)}
            helperText={
              errors.phoneNumber ? "please enter your WhatsApp Number" : null
            }
            {...register("phoneNumber", {
              required: true,
              pattern: {
                value: /^[0-9]*$/, // Validation pattern to accept only numbers
                message: "Please enter a valid phone number",
              },
            })}
          />
        </Stack>
        <Stack>
          <Box sx={{ width: "100%" }}>
            <Textarea
              aria-label="empty textarea"
              placeholder="Message"
              style={{
                borderColor: errors.message ? "red" : "#ccc",
              }}
              {...register("message", {
                required: "You must write your message",
                validate: {
                  minLength: (value) =>
                    value.length >= 10 ||
                    "Your message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <Typography variant="body2" color="error">
                {errors.message.message}
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack
          sx={{
            width: { sx: "70%", md: "25%" },
            marginLeft: { xs: 0, md: "20px" },
          }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#dd3333",
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              fontWeight: "bold",
              fontSize: "20px",
              lineHeight: "16px",
              transition: ".3s",
              "&:hover": { backgroundColor: "black" },
            }}
            type="submit"
          >
            send
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Form;
