import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
function HeroPages({title, image , link, imageSize = { width: 400, height: 400 }, secondPath}) {
  return (
    <Box >
      <Box
        sx={{
          width: "102%",
          position: "relative",
          height: "465px",
          backgroundImage: 'url("/images/about/background-1.jpg")',
          backgroundSize: "cover",
          display: " flex !important",
          "&:before": {
            position: "absolute",
            content: '""',
            top: 0,
            left: 0,
            width: "80.5%",
            height: "100%",
            background: "black",
            ZIndex: -10,
          },
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            flex: "0 0 auto",
            zIndex: 10,
            marginX: "auto",
            marginY: "300px",
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={60}
        >
          <Box>
            <Typography
              component="span" // Replace <p> with <span> or other suitable tag
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                color: "rgba(255,255,255, 0.7)",
                lineHeight: "55px",
              }}
            >
              Transport anything from anywhere
            </Typography>

            <Typography
              component="h1" // Replace <p> with <h1> for larger text
              sx={{
                color: "#ffffff",
                marginBottom: "20px",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: { xs: "55px", md: "72px" },
              }}
            >
              {title}
            </Typography>

            <Stack
              direction={"row"}
              sx={{ color: "white" }}
              gap={1}
              justifyContent={"center"}
            >
              <Link href={"/"}>
                <Typography>Home</Typography>
              </Link>
              <ArrowForwardIosIcon />
              {link?<Typography sx={{ color: "#dd3333" }}>{link}</Typography>:<Typography sx={{ color: "#dd3333" }}>{title}</Typography>}
              {secondPath?
                (<><ArrowForwardIosIcon /><Typography sx={{ color: "#dd3333" }}>{secondPath}</Typography></>):null
              }
            </Stack>
          </Box>

          {image?<Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Image src={image} alt="delivery" width={imageSize.width} height={imageSize.height} />
          </Box>: <Box flexGrow={1}/>}
        </Stack>
      </Box>
    </Box>
  );
}

export default HeroPages;
