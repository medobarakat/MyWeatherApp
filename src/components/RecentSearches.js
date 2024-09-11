import React, { memo } from 'react';
import { Button, Box, Typography } from '@mui/material';
//  *** Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCoordinates, fetchForecastByCoordinates, fetchWeather, fetchForecast, addRecentSearch } from '../reducers/weatherSlice';

const RecentSearches = () => {
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.recentSearches);

  //! get My Location
  const getWeatherForCurrentLocation = () => {
    // i will use here naigator geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeatherByCoordinates({ lat: latitude, lon: longitude }));
          dispatch(fetchForecastByCoordinates({ lat: latitude, lon: longitude }));
        },
        (error) => {
          console.error('Error fetching location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleCityClick = (city) => {
    dispatch(fetchWeather(city));
    dispatch(fetchForecast(city));
    dispatch(addRecentSearch(city));
  };

  return (
    <Box sx={{ marginY: 4, textAlign: 'center' }}>
      <Typography variant="h6" component="h3" sx={{ marginBottom: 2, color: 'primary.main' }}>
        Recent Searches
      </Typography>
      <Button
        onClick={getWeatherForCurrentLocation}
        variant="contained"
        sx={{ marginBottom: 3, color: 'white', backgroundColor: 'primary.main' }}
      >
        Use My Location
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {recentSearches.map((city, index) => (
          <Button
            key={index}
            onClick={() => handleCityClick(city)}
            variant="outlined"
            sx={{ marginBottom: 1, width: '100%', maxWidth: 400, color: 'primary.main', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark', backgroundColor: 'primary.light' } }}
          >
            {city}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default memo(RecentSearches);
