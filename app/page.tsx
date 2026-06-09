"use client";

import { useEffect, useState } from "react";

type Weather = {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
};

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [now, setNow] = useState<Date>(new Date());

  // 🌍 GET USER LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  // 🌤 FETCH WEATHER
  useEffect(() => {
    if (!location) return;

    fetch(
      `/api/weather?lat=${location.latitude}&lon=${location.longitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [location]);

  // ⏰ LIVE CLOCK (UTC+8)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
	hour12: true,
  }).format(now);

  // 🌸 LOADING
  if (!weather) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.loading}>
            🌸 Getting your location...
          </p>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              🕒 Malaysia Time (UTC+8)
            </p>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              {timeString}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>☁️ Kata-kata hari ini</h1>
          <p style={styles.subtitle}>
            Cuaca dinihari, sunyi menyapa bumi
          </p>
        </div>

        {/* TEMP */}
        <div style={styles.tempBox}>
          <h2 style={styles.temp}>
            {weather?.current_weather?.temperature ?? "--"}°C
          </h2>
          <p style={styles.label}>suhu sekarang</p>
        </div>

        {/* WIND */}
        <div style={styles.infoRow}>
          <div style={styles.infoCard}>
            <p style={styles.infoLabel}>🌬 angin</p>
            <p style={styles.infoValue}>
              {weather?.current_weather?.windspeed ?? "--"} km/h
            </p>
          </div>
        </div>

        {/* LIVE CLOCK ONLY */}
        <div style={styles.clockBox}>
          <p style={styles.clockLabel}>
            🕒 Malaysia Time (UTC+8)
          </p>
          <p style={styles.clockTime}>{timeString}</p>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <p>🐱 kekal cozy yo..</p>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
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
    justifyContent: "center",
    gap: "12px",
  },

  infoCard: {
    background: "rgba(255,255,255,0.7)",
    padding: "14px",
    borderRadius: "18px",
    textAlign: "center",
    border: "1px solid rgba(0,0,0,0.05)",
    width: "100%",
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

  clockBox: {
    marginTop: "18px",
    textAlign: "center",
    padding: "12px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "16px",
  },

  clockLabel: {
    fontSize: "12px",
    opacity: 0.7,
    margin: 0,
  },

  clockTime: {
    fontSize: "18px",
    fontWeight: 700,
    marginTop: "4px",
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