import React, { useEffect, useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./WeatherDisplay.css";
import { useState } from "react";
import { use } from "react";
import search_icon from "../../assets/search_icon.png";
import feels_like from "../../assets/feels_like.svg";

function WeatherDisplay() {
  const API_KEY = "b19b67a3f6443905bb4a2f8f24121e14";

  const [weatherData, setWeatherData] = useState(false);

  const search = async (location) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json(); //converts the response to json
      console.log(data);

      setWeatherData({
        temperature: Math.floor(data.main.temp),
        desc: data.weather[0].description,
        feels_like: Math.floor(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("Kathmandu");
  }, []);

  return (
    <div className="app">
      {/* <div className="search">
        <input type="text" placeholder="Enter location" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(weatherData.location)}
        />
      </div> */}
      <SearchBar />

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.location}</p>
          </div>

          <div className="temp">
            <h1>{weatherData.temperature}°F</h1>
          </div>

          <div className="desc">
            <p>{weatherData.desc}</p>
            <img
              className="icon"
              src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt=""
            />
          </div>
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

          {/* <div className="forecast">
            <p className="bold">snow</p>
            <p>in 1hr</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
