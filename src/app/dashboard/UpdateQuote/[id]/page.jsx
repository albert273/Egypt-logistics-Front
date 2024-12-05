"use client";
import HeroPages from "@/components/heroPage/Hero";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  InputAdornment,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import cookie from "cookie-universal";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Country, travelType, typeSeaContainer, GoodsType } from "@/utils/data";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteById } from "@/redux/slice/quotes";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export default function Page(context){
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cookies = cookie();
  const token = cookies.get("token");
  const { id } = context.params;
  const dispatch = useDispatch();
  const quoteData = useSelector((state) => state.Quotes.Quote);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuoteById(id));
    }
  }, [dispatch, id]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = async (data) => {
    const updatedData = Object.keys(quoteData).reduce((acc, key) => {
      acc[key] = data[key] !== undefined ? data[key] : quoteData[key];
      return acc;
    }, {});

    // Remove empty or undefined fields
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    try {
      const res = await axios.put(
        `https://egypt-logistics.vercel.app/api/quote/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        window.location.pathname = `/dashboard/QuoteDetails/${id}`;
      }
    } catch (err) {
      if (err.response?.data?.errors?.length) {
        setErrorMsg(err.response.data.errors[0].msg);
      }
      handleClick();
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
      <TitleDash title={"update Quote"} />
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
            defaultValue={quoteData.name}
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
            defaultValue={quoteData.email}
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
            {...register("email", {})}
          />
          <TextField
            id="number"
            label="Number"
            defaultValue={quoteData.phoneNumber}
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
            label="From"
            defaultValue={quoteData.exportingCountry || ""}
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
            label="To"
            defaultValue={quoteData.importingCountry || ""}
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
            defaultValue={quoteData.tripType || ""}
            label="Trip Type"
            error={Boolean(errors.tripType)}
            helperText={errors.tripType ? "Please select Travel Type" : null}
            {...register("tripType", { required: true })}
            sx={{ width: { xs: "100%", md: 0 }, flex: 1 }}
          >
            {travelType &&
              travelType.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.title}
                  defaultValue={quoteData.tripType}
                >
                  {option.title}
                </MenuItem>
              ))}
          </TextField>
          {type === "Sea" ? (
            <TextField
              id="outlined-select-currency"
              select
              label="Container Type"
              defaultValue={quoteData.containerType || ""}
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
              defaultValue={quoteData.width}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={Boolean(errors.width)}
              helperText={errors.width ? errors.weight.message : null}
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
              defaultValue={quoteData.height}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={Boolean(errors.height)}
              helperText={errors.height ? errors.height.message : null}
              {...register("height", {
                validate: (value) =>
                  value >= 0 || "height must be a positive number",
              })}
            />
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="lenght"
              label="Lenght"
              defaultValue={quoteData.lenght}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={Boolean(errors.lenght)}
              helperText={errors.lenght ? errors.lenght.message : null}
              {...register("lenght", {
                validate: (value) =>
                  value >= 0 || "lenght must be a positive number",
              })}
            />
            <TextField
              sx={{ flex: 1 }}
              type="number"
              id="weight"
              label="weight"
              defaultValue={quoteData.weight}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={Boolean(errors.weight)}
              helperText={errors.weight ? errors.weight.message : null}
              {...register("weight", {
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
              defaultValue={quoteData.goodsType || ""}
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
              defaultValue={quoteData.amount || ""}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={Boolean(errors.amount)}
              helperText={errors.amount ? errors.amount.message : null}
              {...register("amount", {
                validate: (value) =>
                  value >= 0 || "Amount must be a positive number",
              })}
            />
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            System Data:{" "}
          </Typography>
          <TextField
            type="text"
            id="billNumber"
            label="Bill Number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={quoteData.billNumber || ""}
            error={Boolean(errors.billNumber)}
            helperText={errors.billNumber ? errors.billNumber.message : null}
            {...register("billNumber", {})}
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            id="systemNumber"
            label="System Number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={quoteData.systemNumber || ""}
            error={Boolean(errors.systemNumber)}
            helperText={
              errors.systemNumber ? errors.systemNumber.message : null
            }
            {...register("systemNumber", {})}
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            id="fees"
            label="Fees"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={quoteData.systemNumber || ""}
            error={Boolean(errors.fees)}
            helperText={errors.fees ? errors.fees.message : null}
            {...register("fees", {})}
            sx={{ flex: 1 }}
          />
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
