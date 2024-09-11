import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return { weatherData: response.data, forecast: [] };
});

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data.list;
});

export const fetchWeatherByCoordinates = createAsyncThunk(
  'weather/fetchWeatherByCoordinates',
  async ({ lat, lon }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return { weatherData: response.data, forecast: [] };
  }
);

export const fetchForecastByCoordinates = createAsyncThunk(
  'weather/fetchForecastByCoordinates',
  async ({ lat, lon }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data.list;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    forecast: [],
    recentSearches: [],
    loading: false,
    error: null,
  },
  reducers: {
    addRecentSearch: (state, action) => {
      const city = action.payload;
      if (!state.recentSearches.includes(city)) {
        if (state.recentSearches.length >= 3) {
          state.recentSearches.pop();
        }
        state.recentSearches.unshift(city);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload.weatherData;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = 'City not found';
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch forecast';
      });
      builder
  .addCase(fetchWeatherByCoordinates.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchWeatherByCoordinates.fulfilled, (state, action) => {
    state.loading = false;
    state.weatherData = action.payload.weatherData;
  })
  .addCase(fetchWeatherByCoordinates.rejected, (state) => {
    state.loading = false;
    state.error = 'Failed to fetch weather based on location';
  })
  .addCase(fetchForecastByCoordinates.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchForecastByCoordinates.fulfilled, (state, action) => {
    state.loading = false;
    state.forecast = action.payload;
  })
  .addCase(fetchForecastByCoordinates.rejected, (state) => {
    state.loading = false;
    state.error = 'Failed to fetch forecast based on location';
  });

  },
});

export const { addRecentSearch } = weatherSlice.actions;

export default weatherSlice.reducer;
