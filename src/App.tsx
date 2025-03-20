import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination"; // New component we'll create
import { fetchNews } from "./utils/api";
import "./styles/global.css";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("politics");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9); // Show 9 articles per page (3x3 grid on desktop)

  // Sorting state
  const [] = useState("latest"); // default sort by latest

  useEffect(() => {
    async function getNews() {
      try {
        setIsLoading(true);
        setError("");
        const searchQuery = topic ? topic : query;
        const data = await fetchNews(searchQuery, topic);

        // Sort articles by date (newest first)
        const sortedArticles = [...data].sort((a, b) => {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        });

        setArticles(sortedArticles);
        setCurrentPage(1); // Reset to first page when new search/topic
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getNews();
  }, [query, topic]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setQuery(newQuery);
      setTopic("");
    }
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setQuery("");
  };

  // Get current articles for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="app bg-background min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} onTopicSelect={handleTopicSelect} />
      <main className="container mx-auto px-4 pt-20 pb-10 md:py-20 flex-grow">
        {error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <h1 className="text-xl font-bold text-neutral my-2">
                {topic
                  ? `${topic} News`
                  : query
                  ? `Results for "${query}"`
                  : "Latest News"}
              </h1>
              <div className="text-sm text-secondary">
                {!isLoading &&
                  articles.length > 0 &&
                  `Showing ${indexOfFirstArticle + 1}-${Math.min(
                    indexOfLastArticle,
                    articles.length
                  )} of ${articles.length} articles`}
              </div>
            </div>

            <NewsList articles={currentArticles} isLoading={isLoading} />

            {!isLoading && articles.length > articlesPerPage && (
              <Pagination
                articlesPerPage={articlesPerPage}
                totalArticles={articles.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </main>
      <footer className="bg-navbar text-neutral text-center py-4 text-sm mt-auto">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} FarNews</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
