import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

export default function LandingPage() {
  return (
    <Box sx={{ mt: 5, textAlign: 'center', height: '100vh', width: '100%' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{         
          fontFamily: 'BungeeShade', 
          fontSize: '150px', 
          color: 'black',
        }}
      >
        lemming
      </Typography>
      <Typography>Monkey see, monkey do.</Typography>
      <nav>
        <Link href="/authentication/login" variant="body1" fontFamily="LibreCaslon" sx={{ mr: 2 }}>
          Login
        </Link>
        <Link href="/authentication/signup" variant="body1" fontFamily="LibreCaslon">
          Sign Up
        </Link>
      </nav>
    </Box>
  );
};