import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Tüm kaynaklara izin ver - geliştirme için, üretimde daha spesifik olabilirsiniz
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // OPTIONS isteği için hemen yanıt ver
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  // İstek parametrelerini al
  const { sign } = req.query;
  
  if (!sign) {
    return res.status(400).json({ error: "Burç parametresi eksik" });
  }
  
  try {
    // Dış API'ye istek at
    const response = await fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}`
    );
    
    if (!response.ok) {
      // HTTP hatası detayını ekle
      throw new Error(`API yanıtı başarısız: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}