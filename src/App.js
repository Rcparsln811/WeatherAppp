import React, { useState } from "react";
import './App.css';
import { fetchWeather } from "./api/weatherApi";



function App() {

    const [city,setCity] = useState("");
    const [weather,setWeather] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
      setError(""); 
      try {
        const data = await fetchWeather(city); 
        setWeather(data); 
      } catch (err) {
        setWeather(null); 
        setError(err.message); 
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch(); 
      }
    };


  return (
    <div className="App">
      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Şehir girin..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Ara</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weather && (
  <div className="weather-info">
    <h2>{weather.name}</h2>
    <div className="weather-main">
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      </div>
      <div className="weather-temp">
        <p>{Math.round(weather.main.temp)}°C</p>
        <p className="weather-description">
          {weather.weather[0].description.charAt(0).toUpperCase() +
            weather.weather[0].description.slice(1)}
        </p>
      </div>
    </div>
    <div className="weather-details">
      <p>💨 Rüzgar: {weather.wind.speed} m/s</p>
      <p>💧 Nem: {weather.main.humidity}%</p>
      <p>🌡️ Hissedilen Sıcaklık: {Math.round(weather.main.feels_like)}°C</p>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default App;
