"use client";
import HeroPages from "@/components/heroPage/Hero";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import heroImage from "../../../../public/images/about/ss.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import cookie from "cookie-universal";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Country, travelType, typeSeaContainer, GoodsType } from "@/utils/data";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const cookies = cookie();

  const onSubmit = async (data) => {
    const role = cookies.get("role");
    const token = cookies.get("token");

    handleClick();

    try {
      let res;

      if (!role) {
        // Guest user
        res = await axios.post(
          "https://egypt-logistics.vercel.app/api/quote/guest",
          data
        );
      } else if (role === "client") {
        // Logged-in client user
        res = await axios.post(
          "https://egypt-logistics.vercel.app/api/quote/client",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Admin or head officer
        return setErrorMsg("You can't create a request.");
      }

      if (res.status === 201 || res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        Array.isArray(err.response.data.errors)
      ) {
        setErrorMsg(err.response.data.errors[0].msg);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
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

  const type = watch("tripType");
  return (
    <Box>
      <HeroPages title={"Make A Quote"} image={heroImage} />
      <Typography
        sx={{
          marginY: "60px",
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#dd3333",
          textAlign: "center",
          textShadow: "2px 2px 15px #dd3333",
        }}
      >
        Make A Quote
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "70%",
          marginX: "auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Personal Data:{" "}
          </Typography>
          <TextField
            type="text"
            id="Name"
            label="Name"
            error={Boolean(errors.name)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            helperText={errors.name ? errors.name.message : null}
            {...register("name", {
              required: "Name is required",
              validate: {
                minLength: (value) =>
                  value.length >= 3 || "Name must be at least 3 characters",
                isNotNumber: (value) =>
                  isNaN(value) ? true : "You must write your real name",
              },
            })}
            sx={{ flex: 1 }}
          />
          <TextField
            sx={{ flex: 1 }}
            type="email"
            id="Email"
            autoComplete="true"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.email)}
            helperText={errors.email ? "You should enter your Email" : null}
            {...register("email", {
              required: true,
            })}
          />
          <TextField
            id="number"
            label="Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.phoneNumber)}
            helperText={
              errors.phoneNumber ? "please enter whatsApp Number" : null
            }
            {...register("phoneNumber", {
              required: true,
              pattern: phoneRegExp,
            })}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Country:
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue={"1"}
            label="From"
            error={Boolean(errors.exportingCountry)}
            helperText={
              errors.exportingCountry ? "Please select Country" : null
            }
            {...register("exportingCountry", { required: true })}
            sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
          >
            {Country &&
              Country.map((option) => (
                <MenuItem key={option.code} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue={"1"}
            label="To"
            error={Boolean(errors.importingCountry)}
            helperText={
              errors.importingCountry ? "Please select Country" : null
            }
            {...register("importingCountry", { required: true })}
            sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
          >
            {Country &&
              Country.map((option) => (
                <MenuItem key={option.code} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Container Details:
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue={"1"}
            label="Trip Type"
            error={Boolean(errors.tripType)}
            helperText={errors.tripType ? "Please select Travel Type" : null}
            {...register("tripType", { required: true })}
            sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
          >
            {travelType &&
              travelType.map((option) => (
                <MenuItem key={option.id} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
          </TextField>
          {type === "Sea" ? (
            <TextField
              id="outlined-select-currency"
              select
              label="Container Type"
              error={Boolean(errors.containerType)}
              helperText={
                errors.containerType ? "Please select Container type" : null
              }
              {...register("containerType", { required: true })}
              sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
            >
              {typeSeaContainer &&
                typeSeaContainer.map((option) => (
                  <MenuItem key={option.id} value={option.title}>
                    {option.title}
                  </MenuItem>
                ))}
            </TextField>
          ) : (
            <TextField
              id="outlined-select-currency"
              select
              disabled
              label="Container Type"
              sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
            ></TextField>
          )}
        </Stack>

        <Stack gap={3} sx={{ width: "100%" }} alignItems={"center"}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={3}
            sx={{ width: "100%" }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Dominion Data:
            </Typography>
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="width"
              label="Width"
              error={Boolean(errors.width)}
              helperText={errors.width ? "Please enter a positive width" : null}
              {...register("width", {
                required: true,
                validate: (value) =>
                  value >= 0 || "Width must be a positive number",
              })}
            />
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="height"
              label="Height"
              error={Boolean(errors.height)}
              helperText={errors.height ? "please enter height" : null}
              {...register("height", {
                required: true,
                validate: (value) =>
                  value >= 0 || "height must be a positive number",
              })}
            />
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="lenght"
              label="Lenght"
              error={Boolean(errors.lenght)}
              helperText={errors.lenght ? "please enter lenght" : null}
              {...register("lenght", {
                required: true,
                validate: (value) =>
                  value >= 0 || "lenght must be a positive number",
              })}
            />
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="weight"
              label="weight"
              error={Boolean(errors.weight)}
              helperText={errors.weight ? "please enter weight" : null}
              {...register("weight", {
                required: true,
                validate: (value) =>
                  value >= 0 || "weight must be a positive number",
              })}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            sx={{ width: { xx: "100%", md: "50%" } }}
          >
            <TextField
              id="outlined-select-currency"
              select
              defaultValue={"1"}
              label="Goods Type"
              error={Boolean(errors.goodsType)}
              helperText={errors.goodsType ? "Please select goods Type" : null}
              {...register("goodsType", { required: true })}
              sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
            >
              {GoodsType &&
                GoodsType.map((option) => (
                  <MenuItem key={option.id} value={option.title}>
                    {option.title}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="amount"
              label="Amount"
              error={Boolean(errors.amount)}
              helperText={errors.amount ? "please enter height" : null}
              {...register("amount", {
                required: true,
                validate: (value) =>
                  value >= 0 || "amount must be a positive number",
              })}
            />
          </Stack>
        </Stack>

        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "50%",
            height: "3rem",
            marginX: "auto",
            background: "#dd3333",
            fontSize: "1.2rem",
            fontWeight: "bold",
            "&:hover": {
              color: "#fff",
              backgroundColor: "black",
            },
            marginBottom: "60px",
          }}
        >
          submit
        </Button>

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
      </Box>
    </Box>
  );
};

