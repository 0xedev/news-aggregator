import { createContext, useContext, useState, useEffect } from "react";
import { fetchNewsByCategory } from "../utils/apiHelper";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("trending");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchNewsByCategory(category)
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const value = {
    articles,
    loading,
    error,
    category,
    changeCategory,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNewsContext() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
}
