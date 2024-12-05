
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "172px", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "20px",fontSize: "50px" }}>
        Oops! Page not found.
      </Typography>
      <Link href="/" passHref>
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
    </Box>
  );
};

export default NotFoundPage;
