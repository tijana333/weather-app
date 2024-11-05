import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeater = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: lat,
            lon: lon,
            appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            units: "metric",
          },
        }
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const lat = 44.7866;
    const lon = 20.4489;
    fetchWeater(lat, lon);
  }, []);

  return (
    <div>
      {loading && <div> Loading...</div>}
      {error && <div> {error} </div>}
      {weatherData && (
        <div>
          <h1>{weatherData.name}</h1>
          <p>{weatherData.main.temp} °C</p>
        </div>
      )}
    </div>
  );
};

export default App;
