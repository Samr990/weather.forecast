import React from "react";
import "./WeatherDetails.css";

function WeatherDetails({ weatherData, isCelsius }) {
  // Convert Fahrenheit to Celsius if toggle is set
  const convertTemperature = (temp) => {
    return isCelsius ? Math.floor((temp - 32) * (5 / 9)) : temp;
  };

  const details = [
    {
      label: "Feels Like",
      value: `${convertTemperature(weatherData.feels_like)}°${
        isCelsius ? "C" : "F"
      }`,
    },
    { label: "Humidity", value: `${weatherData.humidity}%` },
    { label: "Wind", value: `${weatherData.windSpeed} mph` },
    {
      label: "High / Low",
      value: `${convertTemperature(weatherData.highTemp)}°${
        isCelsius ? "C" : "F"
      } / ${convertTemperature(weatherData.lowTemp)}°${isCelsius ? "C" : "F"}`,
    },
    { label: "Pressure", value: `${weatherData.pressure} hPa` },
  ];

  return (
    <div className="weather-details">
      {details.map((detail, index) => (
        <div className="weather-detail" key={index}>
          <div className="detail-info">
            <p className>
              {detail.label}: {detail.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;
