import React from 'react';
import { Container, Typography, Box } from '@mui/material';
//  *** Components
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import RecentSearches from './components/RecentSearches';
import Forecast from './components/Forecast';
import Footer from './components/Footer';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundImage: 'linear-gradient(to top, rgba(161, 140, 209, 0.4) 0%, rgba(251, 194, 235, 0.4) 100%)',
      }}
    >
      <Typography variant="h3" component="h1" sx={{ marginBottom: 4, color: '#333' }}>
        Weather App
      </Typography>
      <Container maxWidth="sm">
        <WeatherForm />
        <WeatherInfo />
        <RecentSearches />
        <Forecast />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
