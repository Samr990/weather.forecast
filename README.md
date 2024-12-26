# weather.forecast

**Task: Weather Forecast App**

**Objective:** Build a weather forecast application that fetches current weather data from the OpenWeather API based on the user's location or a searched city name.

**Requirements:**

1. **UI Design (CSS Modules):**

   - Design a clean and visually appealing interface using CSS modules.

   - Include:

     - A **search bar** to input a city name.

     - A **weather display** area that shows the temperature, weather description, and an icon.

     - Additional details like humidity, wind speed, and forecast for the day.

2. **Weather Data Fetching (API Integration with OpenWeather):**

   - Register for an API key on the [OpenWeather API](https://openweathermap.org/api).

   - Use the **current weather** API endpoint to fetch weather data based on city search or user location.

   - Parse the response to display key data, such as:

     - City name, temperature, weather description (e.g., "clear sky"), and an appropriate icon.

     - Humidity, wind speed, and forecasted conditions.

3. **React Functionality (useState and useEffect):**

   - Use `useState` to manage:

     - The search input.

     - Weather data.

     - Loading and error states.

   - Use `useEffect` to:

     - Trigger the API call when a new city is searched.

     - Optionally, get the user's current location and fetch weather data on initial load.

4. **Bonus (Optional):**

   - Add a **5-day forecast** display.

   - Implement **unit switching** between Celsius and Fahrenheit.

**Deliverables:**

- A GitHub repository link to the project.

- A README.md file with instructions on setup, API key configuration, and app features.
