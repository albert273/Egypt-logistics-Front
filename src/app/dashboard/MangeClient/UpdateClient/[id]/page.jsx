"use client";
import {
  Alert,
  Button,
  Container,
  Snackbar,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import SignpostIcon from "@mui/icons-material/Signpost";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import cookie from "cookie-universal";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { CircularProgress } from "@mui/material";
import { fetchClientById } from "@/redux/slice/ClintDataSlice";
import { useDispatch, useSelector } from "react-redux";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function UpdateClient(context) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const { id } = context.params;
  const cookies = cookie();
  const token = cookies.get("token");
  const role = cookies.get("role");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.ClientData.client);

  useEffect(() => {
    if (id) {
      dispatch(fetchClientById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    const updatedData = { ...userData, ...data };

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === "") {
        delete updatedData[key];
      }
    });

    try {
      let res = await axios.put(
        `https://egypt-logistics.vercel.app/api/user/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((res.status === 201) | 200) {
        window.location.reload();
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        Array.isArray(err.response.data.errors)
      ) {
        setErrorMsg(err.response.data.errors[0].msg);
      }
      handleClick();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event) => {
    event.preventDefault();
  };

  const password = watch("password");

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

  if (role !== "admin") {
    return (
      <Box sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <ReportGmailerrorredIcon
            sx={{ color: "#dd3333", fontSize: "14rem" }}
          />
          <Typography
            sx={{ color: "#dd3333", fontWeight: "bold", fontSize: "1.6rem" }}
          >
            Sorry you can `&apos;`t access on this page
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <TitleDash
        title={"Update Client"}
        subTitle={"Update Client account by admin only"}
      />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "70%",
          marginX: "auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction={"row"} gap={3}>
          <TextField
            type="text"
            id="Name"
            label="Name"
            defaultValue={userData?.name}
            error={Boolean(errors.name)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            helperText={errors.name ? errors.name.message : null}
            {...register("name", {})}
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            id="username"
            label="UserName"
            defaultValue={userData?.username}
            error={Boolean(errors.username)}
            helperText={errors.username ? errors.username.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            {...register("username", {})}
            sx={{ flex: 1 }}
          />
        </Stack>

        <TextField
          sx={{ flex: 1 }}
          type="email"
          id="Email"
          autoComplete="true"
          label="Email"
          defaultValue={userData?.email}
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
            pattern: regEmail,
          })}
        />

        <TextField
          sx={{ flex: 1 }}
          type={showPassword ? "text" : "password"}
          id="Password"
          label="Password"
          defaultValue={userData?.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#dd3333" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password ? "You should enter your Password" : null}
          {...register("password", {
            minLength: (value) =>
              value.length >= 6 ||
              "password must be at least 6 characters long",
          })}
        />
        <TextField
          sx={{ flex: 1 }}
          type={showConfirmPassword ? "text" : "password"}
          id="passwordConfirm"
          label="Confirm Password"
          defaultValue={userData?.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#dd3333" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.passwordConfirm)}
          helperText={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <TextField
          id="number"
          label="Number"
          defaultValue={userData?.phoneNumber}
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
        />
        <Stack
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          gap={2}
        >
          <TextField
            sx={{ flex: 1 }}
            type="text"
            id="Company"
            label="Company"
            defaultValue={userData?.company}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.company)}
            helperText={errors.company ? "company is required" : null}
            {...register("company", {})}
          />
          <TextField
            sx={{ flex: 1 }}
            type="text"
            id="position"
            label="Position"
            defaultValue={userData?.position}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SignpostIcon sx={{ color: "#dd3333" }} />
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.position)}
            helperText={errors.position ? "position is required" : null}
            {...register("position", {})}
          />
        </Stack>

        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "400px",
            height: "3rem",
            marginX: "auto",
            background: "#dd3333",
            fontSize: "1.2rem",
            fontWeight: "bold",
            "&:hover": {
              color: "#fff",
              backgroundColor: "black",
            },
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
    </>
  );
}
