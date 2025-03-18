import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS başlıklarını ekleyelim
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tüm domainlerden erişime izin ver
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // GET ve OPTIONS isteklerine izin ver
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS isteği için erken dönüş yap
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Query'den burç adını al
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
      throw new Error("API yanıtı başarısız");
    }

    const data = await response.json();

    // JSON yanıtını döndür
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
