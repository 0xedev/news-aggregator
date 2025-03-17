import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import NewsList from "../../components/News/NewsList";
import { searchNews } from "../../utils/apiHelper";

export default function SearchPage() {
  const router = useRouter();
  const { query } = router.query;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchNews(query)
        .then((data) => {
          setArticles(data.articles);
        })
        .catch((error) => {
          console.error("Error searching news:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <Layout title={`Search: ${query || ""} - NewsHub`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">
          Search Results: {query || ""}
        </h1>

        <NewsList articles={articles} loading={loading || !query} />
      </div>
    </Layout>
  );
}
