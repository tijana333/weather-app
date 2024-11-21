import React from "react";

interface CurrentWeatherProps({
  name: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = {
  name,
  temp,
  humidity,
  windSpeed,
  description,
  icon,
}) => {
    return (
        <div>
        <h1> {name}</h1>
        <p> Current Temperature: {temp}  °C </p>
        <p> Humidity: {humidity}  % </p>
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

