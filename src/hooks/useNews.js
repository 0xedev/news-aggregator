import { useState, useEffect } from "react";
import { fetchNewsByCategory, searchNews } from "../utils/apiHelper";

export function useNews(type, param) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!param) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        let data;

        if (type === "category") {
          data = await fetchNewsByCategory(param);
        } else if (type === "search") {
          data = await searchNews(param);
        } else {
          throw new Error("Invalid news fetch type");
        }

        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, param]);

  return { articles, loading, error };
}
