import { Box, Stack } from "@mui/material";
import QuickInformation from "@/components/homePageDashboard/QuickInformation";
import TitleDash from "@/components/dashboard/titlePages/TitleDash";
import ClientAccount from "./ClintData/page";

const HomePage = () => {
  return (
    <Box>
      <TitleDash title={"Dashboard"} subTitle={"Welcome to your dashboard"} />
      <Stack gap={5}>
        <QuickInformation />
          <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} gap={5}>
            <Box
              sx={{
                width: "60rem",
                height: "40rem",
                bgcolor: "#f5f5f5",
                padding: "20px",
                borderRadius: "15px",
                paddingBottom: "130px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",

              }}
            >
              <TitleDash title={"Clients"} subTitle={""}/>
              <Box sx={{width: "100%", height: "100%"}}>
              <ClientAccount />
              </Box>
            </Box>
          </Stack>
      </Stack>
    </Box>
  );
};

export default HomePage;