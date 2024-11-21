import React from "react";

interface HourlyForecastProps {
  hourlyData: Array<{
    dt: number;
    temp: number;
    description: string;
    icon: string;
  }>;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  return (
    <div>
      <h2> Hourly Forecast</h2>
      {hourlyData.map((data, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h4>{new Date(data.dt * 1000).toLocaleTimeString()}</h4>
          <p>Temperature: {data.temp} °C </p>
          <p>{data.description || "Nema podataka"}</p>
          <img
            src={`http://openweathermap.org/img/wn/${data.icon}.png`}
            alt="weather icon"
          />
        </div>
      ))}
    </div>
  );
};

export default HouryForecast;
