import "../styles/WeatherCard.css";

const WeatherCard = ({ location, forecast }) => {
  if (!forecast) return null;

  return (
    <div className="weather-card">
      <h2 className="location-title">
        {location.name}, {location.country}
      </h2>
      <p className="subtitle">5-Day Forecast</p>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-date">{new Date(day.date).toDateString()}</p>
            <img src={day.icon} alt={day.condition} />
            <p>{day.condition}</p>
            <p>🌡 Max: {day.max}°C</p>
            <p>❄ Min: {day.min}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
