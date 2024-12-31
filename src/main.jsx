import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrentWeather />
  </StrictMode>
);
