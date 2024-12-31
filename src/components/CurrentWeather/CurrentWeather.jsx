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
  const [location, setLocation] = useState(""); // Input field value
  const [currentLocation, setCurrentLocation] = useState(null); // Coordinates
  const [isManualSearch, setIsManualSearch] = useState(false); // Track manual search

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

  // Fetch weather data based on city name or coordinates
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

  // Get user's current location or use a default city
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        setIsManualSearch(true); // Enable manual search
        fetchWeatherData("Kathmandu"); // Fallback to default city
      }
    );
  }, []);

  // Fetch weather for current location (geolocation) if not manually searched
  useEffect(() => {
    if (currentLocation && !isManualSearch) {
      fetchWeatherData(currentLocation);
    }
  }, [currentLocation, isManualSearch]);

  // Handle search button click
  const handleSearch = () => {
    if (location.trim()) {
      setIsManualSearch(true); // Indicate manual search
      fetchWeatherData(location.trim()); // Fetch weather for user input
      setLocation(""); // Clear input field
    } else {
      alert("Please enter a valid city name.");
    }
  };

  // Calculate and format local time based on timezone offset
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

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          aria-label="Location input"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update input field
        />
        <img
          src={search_icon}
          alt="Search icon"
          aria-label="Search"
          onClick={handleSearch} // Trigger search
        />
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
                  <h1>{weatherData.temperature}°F</h1>
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
                <WeatherDetails weatherData={weatherData} />
              </div>
            </div>

            <div className="time">
              <h1>
                {weatherData.timezone
                  ? getLocalTime(weatherData.timezone) // Show local time
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
