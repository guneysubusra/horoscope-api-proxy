import fetch from 'node-fetch';

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const { sign } = req.query;

    if (!sign) {
        return res.status(400).json({ error: "Burç parametresi eksik" });
    }

    try {
        const response = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
                "x-rapidapi-key": "91a0ab4a04msh6378e4f7d063593p14d5f6jsnc1772757bc12"
            },
        });

        if (!response.ok) {
            throw new Error("API yanıtı başarısız");
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
