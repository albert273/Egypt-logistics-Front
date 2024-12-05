'use client'
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchClient } from "@/redux/slice/ClintDataSlice";
import cookie from 'cookie-universal'

const ClientAccount = () => {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => state.ClientData.client);
  const cookies = cookie();
  const role = cookies.get("role");

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
    },
    role === 'admin' ? {
      field: "username",
      headerName: "User Name",
      align: "center",
      headerAlign: "center",
    } : undefined,
    role === 'admin' ? {
      field: "password",
      headerName: "Password",
      align: "center",
      headerAlign: "center",
    } : undefined,
    {
      field: "email",
      headerName: "Email",
      cellClassName: "name-column--cell",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Number",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "company",
      headerName: "Company",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ].filter(Boolean); // This filters out undefined columns

  const rows = clientData || [];

  return (
    <>
      <Box
        sx={{ height: "100%", width: { xs: "700px", md: "100%" }, mx: "auto" }}
      >
        <DataGrid
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
          columns={columns}
          rows={rows}
        />
      </Box>
    </>
  );
};

export default ClientAccount;
