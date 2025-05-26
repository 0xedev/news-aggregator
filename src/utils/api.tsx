import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything?q=";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search?q=";

// Cache configuration
const CACHE_KEY_PREFIX = "news_cache_";
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

// Check and retrieve from cache
function getCachedData(query: string, category: string): any[] | null {
  const cacheKey = `${CACHE_KEY_PREFIX}${query}_${category}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
      return data;
    } else {
      localStorage.removeItem(cacheKey); // Remove expired cache
    }
  }
  return null;
}

// Store data in cache
function setCachedData(query: string, category: string, data: any[]) {
  const cacheKey = `${CACHE_KEY_PREFIX}${query}_${category}`;
  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );
}

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

// Function to fetch news from The Guardian API
async function fetchGuardianAPI(query: string) {
  try {
    if (!GUARDIAN_API_KEY) {
      throw new Error("Guardian API key not found in environment variables");
    }

    const response = await axios.get(
      `${GUARDIAN_API_URL}${query}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,trailText`
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (
      response.data.response.results.map((item: any) => ({
        title: item.webTitle,
        description: item.fields.trailText || "No description available",
        urlToImage: item.fields.thumbnail || null,
        url: item.webUrl,
        source: { name: "The Guardian" },
        publishedAt: item.webPublicationDate || new Date().toISOString(),
      })) || []
    );
  } catch (error: any) {
    console.error("Error fetching news from The Guardian API:", error);
    return [];
  }
}

// Function to fetch news from an RSS Feed
async function fetchRSSFeed(rssUrl: string, sourceName: string) {
  try {
    const response = await axios.get(rssUrl, {
      responseType: "text",
    });

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

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

      const mediaContent = item.querySelector("media\\:content, content");
      const urlToImage = mediaContent?.getAttribute("url") || null;

      return {
        title,
        description,
        urlToImage,
        url: link,
        source: { name: sourceName },
        publishedAt: pubDate,
      };
    });

    return items;
  } catch (error) {
    console.error(
      `Error fetching or parsing RSS feed from ${sourceName}:`,
      error
    );
    return [];
  }
}

// Map categories to RSS feeds (NYT and BBC)
function mapCategoryToRSSFeed(
  category: string
): { url: string; source: string }[] {
  const categoryMap: Record<string, { url: string; source: string }[]> = {
    world: [
      {
        url: "https://feeds.bbci.co.uk/news/world/rss.xml",
        source: "BBC News",
      },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
        source: "The New York Times",
      },
    ],
    us: [
      { url: "https://www.npr.org/rss/rss.php?id=1003", source: "NPR" },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
        source: "The New York Times",
      },
    ],
    politics: [
      { url: "https://www.npr.org/rss/rss.php?id=1014", source: "NPR" },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
        source: "The New York Times",
      },
    ],
    business: [
      {
        url: "https://feeds.bbci.co.uk/news/business/rss.xml",
        source: "BBC News",
      },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        source: "The New York Times",
      },
    ],
    technology: [
      {
        url: "https://feeds.bbci.co.uk/news/technology/rss.xml",
        source: "BBC News",
      },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
        source: "The New York Times",
      },
    ],
    science: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml",
        source: "The New York Times",
      },
    ],
    health: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml",
        source: "The New York Times",
      },
    ],
    sports: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
        source: "The New York Times",
      },
    ],
    arts: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml",
        source: "The New York Times",
      },
    ],
    books: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Books.xml",
        source: "The New York Times",
      },
    ],
    style: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Style.xml",
        source: "The New York Times",
      },
    ],
    food: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Food.xml",
        source: "The New York Times",
      },
    ],
    travel: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
        source: "The New York Times",
      },
    ],
    magazine: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Magazine.xml",
        source: "The New York Times",
      },
    ],
    realestate: [
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/RealEstate.xml",
        source: "The New York Times",
      },
    ],
    ai: [
      {
        url: "https://feeds.bbci.co.uk/news/technology/rss.xml",
        source: "BBC News",
      },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
        source: "The New York Times",
      },
    ],
    crypto: [
      {
        url: "https://feeds.bbci.co.uk/news/business/rss.xml",
        source: "BBC News",
      },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        source: "The New York Times",
      },
    ],
  };
  return (
    categoryMap[category.toLowerCase()] || [
      { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC News" },
      {
        url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
        source: "The New York Times",
      },
    ]
  );
}

// Combined fetch function with caching
export async function fetchNews(query: string, category: string = "world") {
  const cachedData = getCachedData(query, category);
  if (cachedData) {
    return cachedData;
  }

  const rssFeeds = mapCategoryToRSSFeed(category);
  const rssPromises = rssFeeds.map(({ url, source }) =>
    fetchRSSFeed(url, source)
  );

  const [newsAPIResults, guardianResults, ...rssFeedResults] =
    await Promise.all([
      fetchNewsAPI(query),
      fetchGuardianAPI(query),
      ...rssPromises,
    ]);

  const combinedResults = [
    ...newsAPIResults,
    ...guardianResults,
    ...rssFeedResults.flat(),
  ];

  combinedResults.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  setCachedData(query, category, combinedResults);
  return combinedResults;
}
