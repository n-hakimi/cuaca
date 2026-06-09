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

  if (!weather) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.loading}>🌸 Loading weather...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>☁️ Cozy Weather</h1>
          <p style={styles.subtitle}>your soft daily forecast</p>
        </div>

        <div style={styles.tempBox}>
          <h2 style={styles.temp}>
            {weather.current_weather.temperature}°C
          </h2>
          <p style={styles.label}>current temperature</p>
        </div>

        <div style={styles.infoRow}>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>🌬 wind</p>
            <p style={styles.infoValue}>
              {weather.current_weather.windspeed} km/h
            </p>
          </div>

          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>⏰ time</p>
            <p style={styles.infoValue}>
              {new Date(weather.current_weather.time).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <p>🐱 stay cozy today</p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffe6f0, #e6f7ff)",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "360px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
  },

  subtitle: {
    margin: "5px 0 0",
    fontSize: "12px",
    opacity: 0.6,
  },

  tempBox: {
    textAlign: "center",
    margin: "25px 0",
  },

  temp: {
    fontSize: "48px",
    margin: 0,
  },

  label: {
    fontSize: "12px",
    opacity: 0.5,
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  infoCard: {
    flex: 1,
    background: "rgba(255,255,255,0.6)",
    padding: "12px",
    borderRadius: "16px",
    textAlign: "center",
  },

  infoLabel: {
    fontSize: "12px",
    margin: 0,
    opacity: 0.6,
  },

  infoValue: {
    fontSize: "14px",
    margin: "5px 0 0",
    fontWeight: 600,
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "12px",
    opacity: 0.6,
  },

  loading: {
    textAlign: "center",
    fontSize: "14px",
  },
};