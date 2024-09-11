import React, { memo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
//  *** Redux
import { useSelector } from 'react-redux';
//  *** Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Forecast = () => {
  const { forecast, loading, error } = useSelector((state) => state);

  if (loading) {
    return <Typography align="center">Loading forecast...</Typography>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  const filteredForecast = forecast.filter((_, index) => index % 8 === 0).slice(0, 5);

  const getWeatherIcon = (description) => {
    if (description.includes('clear')) return <WbSunnyIcon sx={{ fontSize: 30, color: 'yellow' }} />;
    if (description.includes('cloud')) return <CloudIcon sx={{ fontSize: 30, color: 'gray' }} />;
    if (description.includes('rain')) return <ThunderstormIcon sx={{ fontSize: 30, color: 'blue' }} />;
    if (description.includes('snow')) return <AcUnitIcon sx={{ fontSize: 30, color: 'lightblue' }} />;
    return <CloudIcon sx={{ fontSize: 30, color: 'gray' }} />;
  };

  return (
    <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2, color: 'primary.main' }}>
        5-Day Forecast
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          paddingBottom: 2,
          justifyContent: { xs: 'center', sm: 'flex-start' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        {filteredForecast.map((day, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: '100%', sm: 'calc(50% - 8px)', md: '180px' },
              textAlign: 'center',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ color: 'primary.main' }}>
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {new Date(day.dt * 1000).toLocaleDateString('en-US')}
              </Typography>
              <Box sx={{ marginY: 1 }}>
                {getWeatherIcon(day.weather[0].description)}
              </Box>
              <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                Temp: {day.main.temp}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {day.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default memo(Forecast);
