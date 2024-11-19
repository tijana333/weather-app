import React from "react";

interface DailyForecastProps {
  day: string;
  temp: number;
  description: string;
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  day,
  temp,
  description,
}) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
      <h3>{day}</h3>
      <p>Temperature : {temp} °C</p>
      <p>{description}</p>
    </div>
  );
};

export default DailyForecast;
