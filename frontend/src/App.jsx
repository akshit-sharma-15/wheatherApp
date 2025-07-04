import { useState } from "react";
import SearchBar from "./components/searchbar";
import WeatherCard from "./components/weathercard";
import { fetchWeather } from "./services/weatherService";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setError("");
      const data = await fetchWeather(city);
      setLocation(data.location);
      setForecast(data.forecast);
    } catch (err) {
      setError("City not found or backend error.");
      setLocation(null);
      setForecast(null);
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">🌦️ Weather Watch</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="error-msg">{error}</p>}
        <WeatherCard location={location} forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
