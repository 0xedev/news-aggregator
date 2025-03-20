import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything?q=";
// Base RSS URL without the specific category
const RSS_BASE_URL = "https://rss.nytimes.com/services/xml/rss/nyt/";

// Function to fetch news from News API
async function fetchNewsAPI(query: string) {
  try {
    if (!NEWS_API_KEY) {
      throw new Error("News API key not found in environment variables");
    }

    const response = await axios.get(
      `${NEWS_API_URL}${query}&apiKey=${NEWS_API_KEY}`
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data.articles || [];
  } catch (error: any) {
    console.error("Error fetching news from News API:", error);
    return [];
  }
}

// Map your app categories to NYT RSS categories
function mapCategoryToRSSFeed(category: string): string {
  // Map lowercase category to NYT RSS feed categories
  const categoryMap: Record<string, string> = {
    world: "World",
    us: "US",
    politics: "Politics",
    business: "Business",
    technology: "Technology",
    science: "Science",
    health: "Health",
    sports: "Sports",
    arts: "Arts",
    books: "Books",
    style: "Style",
    food: "Food",
    travel: "Travel",
    magazine: "Magazine",
    realestate: "RealEstate",
    ai: "Technology", // Map AI to Technology
    crypto: "Business", // Map Crypto to Business
    // Add more mappings as needed
  };

  // Default to World if no mapping exists
  return categoryMap[category.toLowerCase()] || "World";
}

// Function to fetch news from an RSS Feed using a browser-compatible approach
async function fetchRSSFeed(category: string) {
  try {
    // Map the user-selected category to the appropriate NYT RSS feed
    const nytCategory = mapCategoryToRSSFeed(category);
    const rssUrl = `${RSS_BASE_URL}${nytCategory}.xml`;

    console.log(`Fetching RSS from: ${rssUrl}`);

    const response = await axios.get(rssUrl, {
      responseType: "text",
    });

    // Parse the XML string directly - browser-compatible approach
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    // Extract items from RSS feed
    const items = Array.from(xmlDoc.querySelectorAll("item")).map((item) => {
      const title = item.querySelector("title")?.textContent || "No Title";
      const description =
        item.querySelector("description")?.textContent ||
        item.querySelector("summary")?.textContent ||
        "No Description";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate =
        item.querySelector("pubDate")?.textContent ||
        item.querySelector("published")?.textContent ||
        new Date().toISOString();

      // Handle media content/image
      const mediaContent = item.querySelector("media\\:content, content");
      const urlToImage = mediaContent?.getAttribute("url") || null;

      // Get feed title for source
      const feedTitle =
        xmlDoc.querySelector("channel > title")?.textContent ||
        xmlDoc.querySelector("feed > title")?.textContent ||
        "Unknown Source";

      return {
        title,
        description,
        urlToImage,
        url: link,
        source: { name: feedTitle },
        publishedAt: pubDate,
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching or parsing RSS feed:", error);
    return [];
  }
}

// Modified fetchNews function to combine results, now with category parameter
export async function fetchNews(query: string, category: string = "world") {
  const newsAPIResults = await fetchNewsAPI(query);
  const rssFeedResults = await fetchRSSFeed(category);

  // Combine and return the results
  const combinedResults = [...newsAPIResults, ...rssFeedResults];

  // Sort by publishedAt (newest first)
  combinedResults.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return combinedResults;
}
