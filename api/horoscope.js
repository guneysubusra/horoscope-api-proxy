import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://skymiracles.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  // Get zodiac sign from query parameter
  const { sign } = req.query;
  
  // Check if sign parameter is provided
  if (!sign) {
    return res.status(400).json({ error: "Burç parametresi eksik" });
  }
  
  try {
    // Make request to external API
    const response = await fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}`
    );
    
    // Check if response was successful
    if (!response.ok) {
      throw new Error(`API yanıtı başarısız: ${response.status}`);
    }
    
    // Parse and return JSON response
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}