const express = require("express");
const router = express.Router();

const {
  getWeatherByCity
} = require("../controllers/weatherController");

const {
  searchCities
} = require("../controllers/weatherController");

// GET weather by city or coordinates
router.get("/", getWeatherByCity);

// GET city search suggestions
router.get("/search", searchCities);

module.exports = router;
