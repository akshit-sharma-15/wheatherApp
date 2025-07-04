import { useState } from "react";
import "../styles/searchbar.css"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  const handleInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) return;

    const res = await fetch(`http://localhost:5000/api/weather/search?city=${value}`);
    const data = await res.json();
    setOptions(data);
  };

  const handleSelect = (cityObj) => {
    setQuery("");
    setOptions([]);
    onSearch(cityObj.name); // pass city name to parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search city..."
        value={query}
        onChange={handleInput}
      />
      <ul className="suggestion-list">
        {options.map((city, idx) => (
          <li key={idx} className="suggestion-item" onClick={() => handleSelect(city)}>
            {city.name}, {city.region}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
