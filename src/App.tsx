import React, { useState, useEffect } from "react";
import axios from "axios";
import DailyForecast from "./DailyForecast";

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
  wind: {
    speed: number;
  };
}

interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface HourlyForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface ForecastData {
  day: string;
  temp: number;
  description: string;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchWeather = async (lat: number, lon: number) => {
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
      console.log(process.env.REACT_APP_OPENWEATHER_API_KEY);
      setWeatherData(response.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat: lat,
            lon: lon,
            appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            units: "metric",
          },
        }
      );
      console.log(forecastResponse.data.list);

      const dailyData = forecastResponse.data.list
        .filter((_: ForecastItem, index: number) => index % 8 === 0)
        .map((item: ForecastItem) => ({
          day: new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temp: item.main.temp,
          description: item.weather[0].description,
        }));
      setForecastData(dailyData);

      const hourlyData = forecastResponse.data.list
        .slice(0, 5)
        .map((item: HourlyForecastItem) => ({
          dt: item.dt,
          temp: item.main?.temp,
          description: item.weather?.[0]?.description,
        }));
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCitySuggestions = async (input: string) => {
    if (input.length < 3) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: input,
            limit: 5,
            appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
          },
        }
      );

      const cities = response.data.map((city: any) => city.name);
      setSuggestions(cities);
    } catch (err) {
      console.log("Error fetching city suggestions:", err);
    }
  };

  const handleCitySelect = async (city: string) => {
    setQuery(city);
    setSuggestions([]);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: city,
            limit: 1,
            appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
          },
        }
      );

      const { lat, lon } = response.data[0];
      fetchWeather(lat, lon);
    } catch (err) {
      setError("Failed to fetch city data.");
    }
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => setError("Please, enable location access")
      );
    } else {
      setError("Error! Geolocation is not support!");
    }
  };
  useEffect(() => {
    getGeolocation();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  if (hourlyForecast.length === 0) {
    return <div>Loading hourly forecast...</div>;
  }

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCitySuggestions(e.target.value);
          }}
          placeholder="Enter city name"
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(city)}
                style={{ cursor: "pointer" }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {loading && <div> Loading...</div>}
        {error && <div> {error} </div>}
        {weatherData && (
          <div>
            <h1>{weatherData.name}</h1>
            <p>Current Temperature: {weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>{weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
        <button onClick={getGeolocation}>
          Show time for my current location
        </button>
      </div>
      <h2>Hourly Forecast</h2>
      <div>
        {hourlyForecast.map((data, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h4>{new Date(data.dt * 1000).toLocaleTimeString()}</h4>
            <p>Temperature: {data.temp} °C</p>
            <p>{data.description || "Nema podataka"}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} //ne znam da li je ovo dobro, sa icon.data ne radi
              alt="weather icon"
            />
          </div>
        ))}
      </div>

      <h2>5-Day Forecast</h2>
      <div>
        {forecastData.map((data, index) => (
          <DailyForecast
            key={index}
            day={data.day}
            temp={data.temp}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
