import React from 'react';
import Lottie from 'lottie-react';
import animationData from './lottie/Animation - 1711783703683.json'; // Import the animation JSON file
import { Box } from '@mui/material';

const Loading = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Adjust the height as needed
        }}
      >
        {/* Render the Lottie animation with specified height and width */}
        <Lottie animationData={animationData} />
      </Box>
    );
  };
  
export default Loading;
