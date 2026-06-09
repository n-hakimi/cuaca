import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon } = req.query;

  // STRICT: no fallback
  if (!lat || !lon || typeof lat !== "string" || typeof lon !== "string") {
    return res.status(400).json({
      error: "Missing lat or lon",
    });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch weather",
    });
  }
}