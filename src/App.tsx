import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";
import HourlyForecast from "./HourlyForecast";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [fiveDayForecast, setFiveDayForecast] = useState<any>(null);
  const [hourlyForecast, setHourlyForecast] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectSuggestion = (city: string) => {
    setQuery(city);
    fetchWeather(city);
    fetchFiveDayForecast(city);
    fetchHourlyForecast(city);
  };

  const fetchWeather = async (city: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await response.json();
    setFiveDayForecast(data);
  };

  const fetchHourlyForecast = async (city: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/find?q=${query}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setSuggestions(data.list.map((city: any) => city.name));
  };

  useEffect(() => {
    if (query) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar
        query={query}
        suggestions={suggestions}
        onQueryChange={handleQueryChange}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {weatherData && <CurrentWeather data={weatherData} />}
      {fiveDayForecast && <FiveDayForecast data={fiveDayForecast} />}
      {hourlyForecast && <HourlyForecast data={hourlyForecast} />}
    </div>
  );
};
