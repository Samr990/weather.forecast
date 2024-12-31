import React from "react";
import "./WeatherDetails.css";

function WeatherDetails({ weatherData }) {
  const details = [
    { label: "Feels Like", value: `${weatherData.feels_like}°F` },
    { label: "Humidity", value: `${weatherData.humidity}%` },
    { label: "Wind", value: `${weatherData.windSpeed} mph` },
    {
      label: "High / Low",
      value: `${weatherData.highTemp}°F / ${weatherData.lowTemp}°F`,
    },
    { label: "Pressure", value: `${weatherData.pressure} hPa` },
  ];

  return (
    <div className="weather-details">
      {details.map((detail, index) => (
        <div className="weather-detail" key={index}>
          <div className="detail-info">
            <p>
              {detail.label}: {detail.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;
