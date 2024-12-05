"use client";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import { deleteClient, fetchClient } from "@/redux/slice/ClintDataSlice";
import cookie from "cookie-universal";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Link from "next/link";

export default function ManageClient() {
  const [inputValue, setInputValue] = useState("");
  const [filterdCustomer, setFilterdCustomer] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const cookies = cookie();
  const role = cookies.get("role");


  const dispatch = useDispatch();
  const data = useSelector((state) => state.ClientData.client);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const styles = {
    width: "100%",
    fontSize: " 18px",
    padding: " 10px 5px 10px 30px",
    outline: " transparent",
    borderRadius: " 10px",
    border: `1px solid #dd3333`,
    backgroundColor: "#ffff",
    color: "black",
  };

  useEffect(() => {
    fetchClient(data);
  }, [data]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filter = data.filter(
        (users) => users.username && users.username.toLowerCase().includes(inputValue)
      );
      setFilterdCustomer(filter);
    } else {
      setFilterdCustomer([]);
    }
  }, [inputValue, data]);


  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
  };

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
            flexDirection: "column", // Full viewport height to center vertically
          }}
        >
          <ReportGmailerrorredIcon
            sx={{ color: "#dd3333", fontSize: "14rem" }}
          />
          <Typography
            sx={{ color: "#dd3333", fontWeight: "bold", fontSize: "1.6rem" }}
          >
            Sorry you can`&apos;`t access on this page
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <TitleDash
        title={"Mange Client Account"}
        subTitle={"Managing the Client account"}
      />
      <Container>
        <Box
          sx={{
            width: { sx: "300px", md: "450px" },
            margin: " 20px auto 35px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            color: "#303f9f",
          }}
        >
          <SearchIcon
            sx={{
              position: "absolute",
              top: "50%",
              transform: " translate(0, -50%)",
              left: "5px",
            }}
          />
          <input
            type="text"
            style={styles}
            className="search"
            placeholder="Search"
            onInput={(e) => {
              setInputValue(
                e.target.value // @ts-ignore
                  .toLowerCase()
              );
            }}
          />
        </Box>
        <Box marginBottom={"30px"}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>username</TableCell>

                  <TableCell align="center">delete</TableCell>
                  <TableCell align="center">update</TableCell>
                  <TableCell align="center">Quote</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {filterdCustomer?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.email}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.username}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{
                          backgroundColor: "darkRed",
                          color: "white",
                          "&:hover": { backgroundColor: "#b71c1c" },
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        delete
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/dashboard/MangeClient/UpdateClient/${item.id}`}>
                        <Button
                          sx={{
                            backgroundColor: "#fbc02d",
                            color: "black",
                            "&:hover": { backgroundColor: "#f9a825" },
                            textTransform: "capitalize",
                          }}
                        >
                          update
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/dashboard/MangeClient/ClientQuote/${item.id}`}>
                        <Button
                          sx={{
                            backgroundColor: "green",
                            color: "black",
                            "&:hover": { backgroundColor: "green" },
                            textTransform: "capitalize",
                          }}
                        >
                          Quote
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

