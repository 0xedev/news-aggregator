const API_BASE_URL = "/api/news";

export async function fetchNewsByCategory(category) {
  try {
    const response = await fetch(
      `${API_BASE_URL}?category=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    throw error;
  }
}

export async function searchNews(query) {
  try {
    const response = await fetch(
      `${API_BASE_URL}?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}
