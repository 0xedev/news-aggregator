import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import { fetchNews } from "./utils/api";
import "./styles/global.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("trump");

  useEffect(() => {
    async function getNews() {
      const data = await fetchNews(query);
      setArticles(data);
    }
    getNews();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <main>
        <NewsList articles={articles} />
      </main>
    </div>
  );
}

export default App;
