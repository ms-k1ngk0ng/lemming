import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

export default function LandingPage() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" sx={{ ml: '20px', textAlign: 'center', height: '100vh', width: '100%' }}>
      <Box display="flex" flexDirection="column" sx={{ width: 'fit-content'}}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{         
            fontFamily: 'BungeeShade', 
            fontSize: '150px', 
            color: 'black',
            width: 'fit-content',
            mb: '10px'
          }}
        >
          lemming
        </Typography>
        <Box display="flex" flexDirection="row" justifyItems="flex-end" alignSelf="flex-end" >
          <Typography fontFamily="LibreCaslon" fontWeight="900" letterSpacing="0.09em" fontSize="1.7rem" sx={{ mr: '18px' }}>lemming see, lemming do.</Typography>
          <Box display="flex" alignItems="flex-end" sx={{ pb: '4px' }}>
            <nav>
              <Link href="/authentication/login" variant="body1" fontFamily="LibreCaslon" fontSize="1.2rem" sx={{ mr: 2 }}>
                login
              </Link>
              <Link href="/authentication/signup" variant="body1" fontFamily="LibreCaslon" fontSize="1.2rem">
                sign up
              </Link>
            </nav>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};