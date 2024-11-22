import React from "react";

interface FiveDayForecastProps {
  forecastData: Array<{
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecastData }) => {
  const getDayFromDate = (dt_txt: string): string => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div>
      <h2>5-Day Forecast</h2>
      {forecastData.map((data, index) => (
        <div key={index}>
          <h3>{getDayFromDate(data.dt_txt)}</h3>
          <p>Temperature: {data.main.temp} °C</p>
          <p>{data.weather[0].description}.main</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
