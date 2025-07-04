// backend/controllers/weatherSearchController.js
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;

exports.searchCities = async (req, res) => {
  const { city } = req.query;

  if (!city || city.trim() === "") {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/search.json`,
      {
        params: {
          key: API_KEY,
          q: city.trim(),
        },
      }
    );

    res.json(response.data); // array of matching cities
  } catch (err) {
    console.error("City Search Error:", err.message);
    res.status(400).json({ error: "Search failed" });
  }
};

exports.getWeatherByCity = async (req, res) => {
  const { city, lat, lon } = req.query;

  if ((!city || city.trim() === "") && (!lat || !lon)) {
    return res.status(400).json({ error: "City or coordinates are required" });
  }

  try {
    let url = `http://api.weatherapi.com/v1/forecast.json`;
    let params = { key: API_KEY, days: 5 };
    if (city && city.trim() !== "") {
      params.q = city.trim();
    } else if (lat && lon) {
      params.q = `${lat},${lon}`;
    }
    const response = await axios.get(url, { params });
    const apiData = response.data;
    // Transform to match frontend expectations
    const location = {
      name: apiData.location.name,
      country: apiData.location.country,
    };
    const forecast = apiData.forecast.forecastday.map(day => ({
      date: day.date,
      icon: day.day.condition.icon,
      condition: day.day.condition.text,
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c,
    }));
    res.json({ location, forecast });
  } catch (err) {
    console.error("Weather Lookup Error:", err.message);
    res.status(400).json({ error: "Weather lookup failed" });
  }
};
