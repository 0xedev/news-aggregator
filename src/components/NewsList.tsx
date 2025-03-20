import NewsCard from "./NewsCard";

interface NewsListProps {
  articles: {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: { name: string };
    publishedAt: string;
  }[];
}

function NewsList({ articles }: NewsListProps) {
  return (
    <div className="cards-container">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
