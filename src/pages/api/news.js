export default async function handler(req, res) {
  const { category, query } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing" });
  }

  let url = "https://newsapi.org/v2/";

  if (query) {
    url += `everything?q=${encodeURIComponent(query)}`;
  } else if (category === "trending") {
    url += "top-headlines?country=us";
  } else if (category) {
    url += `top-headlines?category=${encodeURIComponent(category)}&country=us`;
  } else {
    url += "top-headlines?country=us";
  }

  url += `&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({
      error: "Failed to fetch news",
      message: error.message,
    });
  }
}
