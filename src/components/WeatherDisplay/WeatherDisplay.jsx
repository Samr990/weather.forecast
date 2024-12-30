import React, { useEffect, useRef } from "react";
import "./WeatherDisplay.css";
import { useState } from "react";
import { use } from "react";
import search_icon from "../../assets/search_icon.png";

function WeatherDisplay() {
  const API_KEY = "b19b67a3f6443905bb4a2f8f24121e14";

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(""); // State to track user input

  const search = async (location) => {
    if (!location) {
      alert("Please enter a location!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;
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
        });
      } else {
        alert(data.message || "Error fetching weather data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    search("Kathmandu"); // Default search on component mount
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update state with user input
        />
        <img
          src={search_icon}
          alt="Search icon"
          onClick={() => search(location)} // Use input value for search
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
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
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
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;
