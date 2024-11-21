import React from "react";

interface FiveDayForecastProps {
  forecastData: Array<{
    day: string;
    temp: number;
    description: string;
  }>;
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecastData }) => {
  return (
    <div>
      <h2>5-Day Forecast</h2>
      {forecastData.map((data, index) => (
        <div key={index}>
          <h3>{data.day}</h3>
          <p>Temperature: {data.temp} °C</p>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
