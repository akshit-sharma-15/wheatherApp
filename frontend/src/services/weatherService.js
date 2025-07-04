export const fetchWeather = async (city) => {
  const res = await fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error("Could not fetch weather");
  const data = await res.json();
  return data;
};
