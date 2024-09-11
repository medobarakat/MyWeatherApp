import React, { memo } from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f8f8',
        padding: '16px',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        position: 'fixed',
        width: '100%',
        bottom: 0,
      }}
    >
      <Typography variant="h6" color="textSecondary">
       Created By : Ahmed Barakat
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link href="mailto:ahmedbarakat2401@gmail.com" color="inherit">
          ahmedbarakat2401@gmail.com
        </Link>
      </Typography>
    </Box>
  );
};

export default memo(Footer);
