import React, { memo } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
//  *** Redux
import { useSelector } from 'react-redux';
//  *** Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const WeatherInfo = () => {
  const { weatherData, loading, error } = useSelector((state) => state);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  const getWeatherIcon = (description) => {
    if (description.includes('clear')) return <WbSunnyIcon sx={{ fontSize: 50, color: 'yellow' }} />;
    if (description.includes('cloud')) return <CloudIcon sx={{ fontSize: 50, color: 'gray' }} />;
    if (description.includes('rain')) return <ThunderstormIcon sx={{ fontSize: 50, color: 'blue' }} />;
    if (description.includes('snow')) return <AcUnitIcon sx={{ fontSize: 50, color: 'lightblue' }} />;
    return <CloudIcon sx={{ fontSize: 50, color: 'gray' }} />;
  };

  return (
    weatherData && (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Card sx={{ maxWidth: 400, textAlign: 'center', padding: 2, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: 2, color: 'primary.main' }}>
              {weatherData.name}
            </Typography>
            <Box sx={{ marginY: 2 }}>
              {getWeatherIcon(weatherData.weather[0].description)}
            </Box>
            <Typography variant="h6" sx={{ marginBottom: 1, color: 'secondary.main' }}>
              Temperature: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ marginBottom: 1 }}>
              Description: {weatherData.weather[0].description}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              Humidity: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wind Speed: {weatherData.wind.speed} m/s
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  );
};

export default memo(WeatherInfo);
