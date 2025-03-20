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
  isLoading?: boolean;
}

function NewsList({ articles, isLoading = false }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-neutral">Loading news...</div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
