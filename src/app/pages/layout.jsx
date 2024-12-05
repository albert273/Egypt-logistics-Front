import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import DashIcon from "@/components/dashboardIcon/DashIcon";
import { Box } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <Box>
        <Navbar />
        <DashIcon />
        {children}
        <Footer />
      </Box>
    </>
  );
}
