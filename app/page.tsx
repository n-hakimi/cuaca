"use client";

import { useEffect, useState } from "react";

type Weather = {
  current_weather: {
    temperature: number;
    windspeed: number;
    time: string;
  };
};

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  if (!weather)
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Weather MVP</h1>

      <h2 style={{ fontSize: "40px" }}>
        {weather.current_weather.temperature}°C
      </h2>

      <p>Wind Speed: {weather.current_weather.windspeed}</p>

      <p>Time: {weather.current_weather.time}</p>
    </div>
  );
}