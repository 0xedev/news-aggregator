import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import NewsList from "../../components/News/NewsList";
import { fetchNewsByCategory } from "../../utils/apiHelper";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);
      fetchNewsByCategory(category)
        .then((data) => {
          setArticles(data.articles);
        })
        .catch((error) => {
          console.error("Error fetching category news:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category]);

  // Format the category name for display
  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <Layout title={`${categoryName || "Category"} News - NewsHub`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{categoryName} News</h1>

        <NewsList articles={articles} loading={loading || !category} />
      </div>
    </Layout>
  );
}
