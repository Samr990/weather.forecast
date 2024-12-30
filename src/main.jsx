import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherDisplay />
  </StrictMode>
);
