import NewsCard from "@/components/News/NewsCard";

export default function NewsList({ articles = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg h-96 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl text-gray-600">No articles found</h3>
        <p className="text-gray-500 mt-2">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.title}-${index}`} article={article} />
      ))}
    </div>
  );
}
