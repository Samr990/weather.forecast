import React, { useEffect, useState } from "react";
import "./WeatherDisplay.css";
import search_icon from "../../assets/search_icon.png";

function WeatherDisplay() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(""); // Input field value
  const [currentLocation, setCurrentLocation] = useState(null); // Coordinates
  const [isManualSearch, setIsManualSearch] = useState(false); // Track manual search

  // Fetch weather data based on city name or coordinates
  const fetchWeatherData = async (query) => {
    try {
      const url =
        typeof query === "string"
          ? `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&units=imperial&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData({
          temperature: Math.floor(data.main.temp),
          desc: data.weather[0].description,
          feels_like: Math.floor(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.floor(data.wind.speed),
          location: data.name,
          icon: data.weather[0].icon,
          timezone: data.timezone, // Save timezone offset
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
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                  alt="Weather Icon"
                />
              </div>
            </div>
            <div className="time">
              <h1>
                {weatherData.timezone
                  ? getLocalTime(weatherData.timezone) // Show local time
                  : "Loading time..."}
              </h1>
            </div>
            <div className="bottom">
              <div className="feels-like">
                <p className="bold">Feels like</p>
                <p>{weatherData.feels_like}°F</p>
              </div>
              <div className="humidity">
                <p className="bold">Humidity</p>
                <p>{weatherData.humidity}%</p>
              </div>
              <div className="wind">
                <p className="bold">Wind</p>
                <p>{weatherData.windSpeed} mph</p>
              </div>
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
