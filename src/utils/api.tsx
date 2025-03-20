import axios from "axios";

const API_KEY = "0358f7b6374642cba96690f0318d4b21"; // Store this securely!
const url = "https://newsapi.org/v2/everything?q=";

export async function fetchNews(query: string) {
  try {
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
