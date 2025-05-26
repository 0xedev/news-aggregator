import NewsCard from "./NewsCard";
import { memo } from "react";

interface NewsListProps {
  articles: {
    title: string;
    description: string;
    urlToImage: string | null;
    url: string;
    source: { name: string };
    publishedAt: string;
  }[];
  isLoading?: boolean;
}

function NewsList({ articles, isLoading = false }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 animate-pulse"
          >
            <div className="h-32 sm:h-40 md:h-48 bg-gray-200 rounded-t-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
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
        <ErrorBoundary key={article.url}>
          <NewsCard article={article} />
        </ErrorBoundary>
      ))}
    </div>
  );
}

// Simple error boundary to catch rendering issues
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Error rendering NewsCard:", error);
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">Failed to render article.</span>
      </div>
    );
  }
};

// Memoize NewsList to prevent unnecessary re-renders
export default memo(NewsList);
