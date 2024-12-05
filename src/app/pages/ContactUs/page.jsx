'use client'
import Section from '@/components/contactUs/Section'
import { Alert, Box, Snackbar } from '@mui/material'
import React from 'react'
import delivery from "../../../../public/images/about/ss.png";
import HeroPages from '@/components/heroPage/Hero'
import { useState } from 'react';

export default function Page() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleOpenSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Box>
        <HeroPages title={"Contact Us"} image={delivery}/>
        <Section handleOpen={handleOpenSnackbar}/>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '200%', fontSize: "18px", alignItems: "center" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

