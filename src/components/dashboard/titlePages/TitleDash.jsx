import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";

const TitleDash = ({title, subTitle}) => {
  return (
    <Box marginBottom={"20px"}>
    <Typography
      sx={{
        color: "#dd3333",
        fontWeight: "bold",
      }}
      variant="h5"
    >
      {title}
    </Typography>
    <Typography variant="body1">{subTitle}</Typography>
  </Box>

  
  );
}

export default TitleDash;