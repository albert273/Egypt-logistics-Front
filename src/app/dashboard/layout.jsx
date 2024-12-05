"use client";
import { Box } from "@mui/material";
import DashHeader from "../../components/dashboard/dashHeader/DashHeader";
import cookie from "cookie-universal";
import { CircularProgress } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/redux/Store";

export default function DashLayout({ children }) {
  const [role, setRole] = useState();

  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
  }, []);

  const isAdminOrHeadOffice = role === "admin" || role === "headOffice";

  if (!isAdminOrHeadOffice) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#dd3333", fontSize: "3rem" }} />
      </Box>
    );
  }
  return (
    <div>
      <Provider store={storeRef.current}>
        <DashHeader>{children}</DashHeader>
      </Provider>
    </div>
  );
};

