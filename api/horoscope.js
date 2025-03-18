export default async function handler(req, res) {
    const { sign } = req.query;

    if (!sign) {
        return res.status(400).json({ error: "Burç parametresi eksik" });
    }

    try {
        const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}`);

        if (!response.ok) {
            throw new Error("API yanıtı başarısız");
        }

        const data = await response.json();

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
