import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherDisplay />
  </StrictMode>
);

//const API_KEY = "b19b67a3f6443905bb4a2f8f24121e14";
