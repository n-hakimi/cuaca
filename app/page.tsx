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
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 1. GET USER LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  // 2. FETCH WEATHER AFTER LOCATION
  useEffect(() => {
    if (!location) return;

    fetch(
      `/api/weather?lat=${location.latitude}&lon=${location.longitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("weather:", data);
        setWeather(data);
      });
  }, [location]);

  // 3. LOADING STATE
  if (!weather) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.loading}>
            🌸 Getting your location...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>☁️ Kata-kata hari ini</h1>
          <p style={styles.subtitle}>
            Cuaca dinihari, sunyi menyapa bumi
          </p>
        </div>

        <div style={styles.tempBox}>
          <h2 style={styles.temp}>
            {weather?.current_weather?.temperature ?? "--"}°C
          </h2>
          <p style={styles.label}>suhu sekarang</p>
        </div>

        <div style={styles.infoRow}>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>🌬 angin</p>
            <p style={styles.infoValue}>
              {weather?.current_weather?.windspeed ?? "--"} km/h
            </p>
          </div>

          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>⏰ masa</p>
            <p style={styles.infoValue}>
              {weather?.current_weather?.time
                ? new Date(
                    weather.current_weather.time
                  ).toLocaleTimeString()
                : "--"}
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <p>🐱 kekal cozy yo..</p>
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES (unchanged, just kept clean)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffd6e8, #d6f3ff)",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
    padding: "20px",
    color: "#1f2937",
  },

  card: {
    width: "100%",
    maxWidth: "360px",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "28px",
    padding: "26px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
    border: "1px solid rgba(255,255,255,0.6)",
  },

  header: {
    textAlign: "center",
    marginBottom: "18px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    color: "#111827",
  },

  subtitle: {
    margin: "6px 0 0",
    fontSize: "13px",
    opacity: 0.7,
    color: "#374151",
  },

  tempBox: {
    textAlign: "center",
    margin: "26px 0",
  },

  temp: {
    fontSize: "54px",
    margin: 0,
    fontWeight: 800,
    color: "#111827",
  },

  label: {
    fontSize: "12px",
    opacity: 0.7,
    color: "#4b5563",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },

  infoCard: {
    flex: 1,
    background: "rgba(255,255,255,0.7)",
    padding: "14px",
    borderRadius: "18px",
    textAlign: "center",
    border: "1px solid rgba(0,0,0,0.05)",
  },

  infoLabel: {
    fontSize: "12px",
    margin: 0,
    opacity: 0.7,
    color: "#6b7280",
  },

  infoValue: {
    fontSize: "14px",
    margin: "6px 0 0",
    fontWeight: 600,
    color: "#111827",
  },

  footer: {
    marginTop: "22px",
    textAlign: "center",
    fontSize: "12px",
    opacity: 0.75,
    color: "#6b7280",
  },

  loading: {
    textAlign: "center",
    fontSize: "14px",
    color: "#374151",
  },
};