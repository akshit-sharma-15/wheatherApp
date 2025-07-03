const axios = require('axios');

const getCoordinates = async (city) => {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  const response = await axios.get(geoURL);
  const data = response.data;
  if (data.results && data.results.length > 0) {
    return data.results[0]; // { latitude, longitude, name, country }
  }
  throw new Error('City not found');
};

const getWeather = async (lat, lon) => {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const response = await axios.get(weatherURL);
  return response.data;
};

exports.getWeatherByCity = async (req, res) => {
  const { city } = req.query;
  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(location.latitude, location.longitude);
    res.json({
      location: {
        name: location.name,
        country: location.country,
        lat: location.latitude,
        lon: location.longitude,
      },
      forecast: weather.daily,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error fetching weather data' });
  }
};
