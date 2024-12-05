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
import { deleteHeadOfficer, fetchHeadOffice } from "@/redux/slice/HeadOfficeSlice";
import cookie from "cookie-universal";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Link from "next/link";

const ManageClient = () => {
  const [inputValue, setInputValue] = useState("");
  const [filterHeadOfficer, setFilterHeadOfficer] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const HeadOfficer = useSelector((state) => state.HeadOfficer.headOfficer || []);

  useEffect(() => {
    dispatch(fetchHeadOffice());
  }, []);
  
  const cookies = cookie();
  const role = cookies.get("role");


  const handleDelete = (id) => {
    dispatch(deleteHeadOfficer(id));
  };



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
    setFilterHeadOfficer(HeadOfficer);
  }, [HeadOfficer]);

  useEffect(() => {
    if (Array.isArray(HeadOfficer)) {
      const filter = HeadOfficer.filter(
        (users) => users.username && users.username.toLowerCase().includes(inputValue)
      );
      setFilterHeadOfficer(filter);
    } else {
      setFilterHeadOfficer([]);
    }
  }, [inputValue, HeadOfficer]);
  
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
            flexDirection: "column", // Full viewport height to center vertically
          }}
        >
          <ReportGmailerrorredIcon
            sx={{ color: "#dd3333", fontSize: "14rem" }}
          />
          <Typography
            sx={{ color: "#dd3333", fontWeight: "bold", fontSize: "1.6rem" }}
          >
            Sorry you can't access on this page
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
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {filterHeadOfficer?.map((item) => (
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
                      <Link href={`/dashboard/ManageHeadOfficer/UpdateHeadOfficer/${item.id}`}>
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

export default ManageClient;
