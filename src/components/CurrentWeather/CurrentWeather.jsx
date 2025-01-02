import React, { useEffect, useState } from "react";
import "./CurrentWeather.css";
import search_icon from "../../assets/search_icon.png";

import clear_icon from "../../assets/clear.svg";
import clouds_icon from "../../assets/clouds.svg";
import rain_icon from "../../assets/rain.svg";
import snow_icon from "../../assets/snow.svg";
import thunderstorm_icon from "../../assets/thunder_rain.svg";
import mist_icon from "../../assets/mist.svg";
import moderate_heavy_rain_icon from "../../assets/moderate_heavy_rain.svg";
import WeatherDetails from "../WeatherDetails/WeatherDetails";

function WeatherDisplay() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isManualSearch, setIsManualSearch] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false); // Toggle for temperature unit

  const allIcons = {
    "01d": clear_icon,
    "02d": clouds_icon,
    "03d": clouds_icon,
    "04d": clouds_icon,
    "09d": moderate_heavy_rain_icon,
    "10d": rain_icon,
    "11d": thunderstorm_icon,
    "13d": snow_icon,
    "50d": mist_icon,
    "01n": clear_icon,
    "02n": clouds_icon,
    "03n": clouds_icon,
    "04n": clouds_icon,
    "09n": moderate_heavy_rain_icon,
    "10n": rain_icon,
    "11n": thunderstorm_icon,
    "13n": snow_icon,
    "50n": mist_icon,
  };

  const fetchWeatherData = async (query) => {
    try {
      const url =
        typeof query === "string"
          ? `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&units=imperial&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      if (data.cod === 200) {
        setWeatherData({
          temperature: Math.floor(data.main.temp),
          desc: data.weather[0].description,
          feels_like: Math.floor(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.floor(data.wind.speed),
          location: data.name,
          icon: icon,
          timezone: data.timezone,
          highTemp: Math.floor(data.main.temp_max),
          lowTemp: Math.floor(data.main.temp_min),
          pressure: data.main.pressure,
        });
      } else {
        setWeatherData(null);
        alert(data.message || "City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Network error. Please try again.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        setIsManualSearch(true);
        fetchWeatherData("Kathmandu");
      }
    );
  }, []);

  useEffect(() => {
    if (currentLocation && !isManualSearch) {
      fetchWeatherData(currentLocation);
    }
  }, [currentLocation, isManualSearch]);

  const handleSearch = () => {
    if (location.trim()) {
      setIsManualSearch(true);
      fetchWeatherData(location.trim());
      setLocation("");
    } else {
      alert("Please enter a valid city name.");
    }
  };

  const getLocalTime = (timezoneOffset) => {
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    return localTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const convertTemperature = (temp) => {
    return isCelsius ? Math.floor((temp - 32) * (5 / 9)) : temp;
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          aria-label="Location input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <img
          src={search_icon}
          alt="Search icon"
          aria-label="Search"
          onClick={handleSearch}
        />
        {/* Toggle Button for Celsius */}
        <button
          className="toggle-button"
          onClick={() => setIsCelsius(!isCelsius)}
        >
          Switch to {isCelsius ? "°F" : "°C"}
        </button>
      </div>

      <div className="container">
        {weatherData ? (
          <>
            <div className="side-by-side">
              <div className="top">
                <div className="location">
                  <p>{weatherData.location}</p>
                </div>
                <div className="temp">
                  <h1>
                    {convertTemperature(weatherData.temperature)}
                    {isCelsius ? "°C" : "°F"}
                  </h1>
                </div>
                <div className="desc">
                  <p className="bold">{weatherData.desc}</p>
                  <img
                    className="icon"
                    src={weatherData.icon}
                    alt="Weather Icon"
                  />
                </div>
              </div>
              <div className="top-right">
                <WeatherDetails
                  weatherData={weatherData}
                  isCelsius={isCelsius}
                />
              </div>
            </div>

            <div className="time">
              <h1>
                {weatherData.timezone
                  ? getLocalTime(weatherData.timezone)
                  : "Loading time..."}
              </h1>
            </div>
          </>
        ) : (
          <p className="loading">Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;
