import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const url = "https://newsapi.org/v2/everything?q=";

export async function fetchNews(query: string) {
  try {
    if (!API_KEY) {
      throw new Error("API key not found in environment variables");
    }

    const response = await axios.get(`${url}${query}&apiKey=${API_KEY}`);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data.articles || [];
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return [];
  }
}
