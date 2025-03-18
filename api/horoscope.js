import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS başlıklarını ekle
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS isteği için erken dönüş yap
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // URL'den burç adını al
  const { sign } = req.query;

  if (!sign) {
    return res.status(400).json({ error: "Burç parametresi eksik" });
  }

  try {
    // RapidAPI üzerinden burç yorumu çek
    const response = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "728e92e73bmshfa862e8c90e87e1p1933e8jsn199557b14125", // Senin API Key'in
        "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      throw new Error("API yanıtı başarısız");
    }

    const data = await response.json();

    // API'den gelen veriyi JSON olarak döndür
    res.status(200).json({ horoscope: data.description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
