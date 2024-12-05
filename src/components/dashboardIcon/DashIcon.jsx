'use client'
import React, { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { keyframes } from '@mui/system';
import cookie from "cookie-universal";

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;




const DashIcon = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    const cookies = cookie();
    setRole(cookies.get("role"));
  }, []);

  if(role !== 'admin' && role !== 'headOffice') return null;
  return (
    <Link href={'/dashboard'}>
      <Box
        sx={{
          position: "fixed",
          top: "30%",
          left: "0",
          zIndex: "20",
          cursor: "pointer",
          backgroundColor: "#dd3333",
          borderRadius: "50%",
          padding: "20px",
          cursor: "pointer"
        }}
      >
        <IconButton sx={{
          width: "40px",
          height: "40px",
          marginX: "auto",
          marginY: "auto",
          zIndex: "677",
          animation: `${rotateAnimation} 2s linear infinite`, // Apply the rotation animation
        }}>
          <SettingsIcon sx={{ color: "#ffff", fontSize: "3rem" }} />
        </IconButton>
      </Box>
    </Link>
  );
}

export default DashIcon;
