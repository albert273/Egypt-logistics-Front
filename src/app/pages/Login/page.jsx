"use client";
import {
  Button,
  Container,
  Stack,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import { useState, useEffect } from "react";
import cookie from "cookie-universal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LogoutIcon from "@mui/icons-material/Logout";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
    try {
      let res = await axios.post(
        "https://egypt-logistics.vercel.app/api/auth/login",
        data
      );
      if ((res.status === 201) | 200) {
        window.location.pathname = "/";
        cookies.set("name", res.data.data.name);
        cookies.set("id", res.data.data.id);
        cookies.set("token", res.data.token);
        res.data.data.accountType === "headOffice"
          ? cookies.set("role", "Head Officer")
          : cookies.set("role", res.data.data.accountType);
      }
    } catch (err) {
      console.log("Error:", err);
      handleClick();
      setError(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
    setIsLoading(false);
  }, []);

  if (isLoading) {
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
  }

  if (role) {
    return (
      <Stack
        sx={{ height: "100vh", marginX: "auto", marginY: "auto" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={6}
      >
        <Typography
          sx={{ fontSize: "3rem", fontWeight: "bold", color: "#dd3333" }}
        >
          You are already Login
        </Typography>
        <Stack direction={"row"} gap={4}>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "black",
              padding: {
                xs: "8px 12px",
                sm: "10px 16px",
              },
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "16px",
              transition: ".3s",
            }}
            endIcon={
              <LogoutIcon
                sx={{
                  height: "28px",
                  width: "28px",
                  lineHeight: "32px",
                  marginLeft: "6px",
                }}
              />
            }
            onClick={() => {
              cookies.removeAll();
              window.location.pathname = "/";
            }}
          >
            logout
          </Button>
          <Link href={"/"}>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#dd3333",
                padding: {
                  xs: "8px 12px",
                  sm: "10px 16px",
                },
                marginRight: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "16px",
                transition: ".3s",
                "&:hover": { backgroundColor: "black" },
              }}
              endIcon={
                <ForwardOutlinedIcon
                  sx={{
                    height: "28px",
                    width: "28px",
                    lineHeight: "32px",
                    marginLeft: "6px",
                  }}
                />
              }
            >
              Go Back Home
            </Button>
          </Link>
        </Stack>
      </Stack>
    );
  }
  return (
    <>
      <Stack
        sx={{
          height: { xs: "50vh", sm: "100vh" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            width: { xs: "100%", sm: "60%", md: "45%" },
            border: { xs: "none", md: " 2px solid window.theme.palette" },
            borderRadius: "30px",
            backgroundColor: { xs: "none", md: "#f5f5f5" },
            boxShadow: { xs: "none", md: ".5px .5px 10px " },
            padding: { xs: "0", md: "40px" },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginX: "auto",
              marginBottom: "35px",
              padding: "15px",
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#dd3333",
              borderBottom: "2px solid theme.palette.text.primary",
              width: "50%",
            }}
          >
            Login
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            noValidate
          >
            <Stack gap={3}>
              <TextField
                sx={{ flex: 1 }}
                type="email"
                id="email"
                label="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#dd3333" }} />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.email) || error}
                helperText={errors.email ? errors.email.message : null}
                {...register("email", {
                  pattern: {
                    value: regEmail,
                    message:
                      "Please enter a valid email address ending with @gmail.com",
                  },
                  required: "Your should enter your Email",
                })}
              />
              <TextField
                sx={{ flex: 1 }}
                type={showPassword ? "text" : "password"}
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
                          showPassword
                            ? "hide the password"
                            : "display the password"
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
                label="Password"
                error={Boolean(errors.password) || error}
                helperText={errors.password ? "try agin" : null}
                {...register("password", {
                  required: true,
                })}
              />
            </Stack>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "15rem",
                height: "3rem",
                display: "flex",
                ml: "auto",
                mr: "auto",
                alignItems: "center",
                background: "#dd3333",
                fontSize: "1.2rem",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "black",
                },
              }}
            >
              Login
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="error">Email or password was wrong</Alert>
            </Snackbar>
          </Box>
        </Container>
      </Stack>
    </>
  );
};

export default Login;
