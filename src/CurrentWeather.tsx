import React from "react";

interface CurrentWeatherProps {
  data: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    name: string;
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { temp, humidity, windSpeed, description, icon, name } = data;

  return (
    <div>
      <h1> {data.name}</h1>
      <p> Current Temperature: {temp} °C </p>
      <p> Humidity: {humidity} % </p>
      <p> Wind Speed: {windSpeed} m/s</p>
      <p>{description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt="weather icon"
      />
    </div>
  );
};

export default CurrentWeather;
