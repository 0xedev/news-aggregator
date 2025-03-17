import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import NewsList from "../components/News/NewsList";
import NewsFilter from "../components/News/NewsFilter";
import { fetchNewsByCategory } from "../utils/apiHelper";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = async (category) => {
    setLoading(true);
    try {
      const data = await fetchNewsByCategory(category);
      setArticles(data.articles);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCategoryChange("trending");
  }, []);

  return (
    <Layout title="NewsHub - Latest Breaking News">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Breaking News</h1>

        <NewsFilter onCategoryChange={handleCategoryChange} />

        <NewsList articles={articles} loading={loading} />
      </div>
    </Layout>
  );
}
