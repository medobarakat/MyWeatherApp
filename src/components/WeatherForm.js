import React, { memo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography } from '@mui/material';
//  *** Redux
import { useDispatch } from 'react-redux';
import { fetchWeather, addRecentSearch, fetchForecast } from '../reducers/weatherSlice';

const WeatherForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      city: '',
    },
    validationSchema: Yup.object({
      city: Yup.string().required('City name is required'),
    }),
    onSubmit: (values) => {
      dispatch(fetchWeather(values.city));
      dispatch(fetchForecast(values.city))
      dispatch(addRecentSearch(values.city));
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginY: 4 }}>
      <Typography variant="h6" component="h2" sx={{ marginBottom: 2, color: 'primary.main' }}>
        Enter City Name
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="City"
          name="city"
          variant="outlined"
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: '12px', backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
        >
          Get Weather
        </Button>
      </form>
    </Box>
  );
};

export default memo(WeatherForm);
