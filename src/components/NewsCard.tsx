interface NewsCardProps {
  article: {
    title: string;
    description: string;
    urlToImage: string | null;
    url: string;
    source: { name: string };
    publishedAt: string;
  };
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-5 transition-transform hover:shadow-lg overflow-hidden">
      <div className="sm:flex sm:flex-col md:block">
        <div className="relative w-full">
          <img
            src={article.urlToImage || "/api/placeholder/400/200"}
            alt={article.title}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-lg"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/api/placeholder/400/200";
            }}
          />
        </div>
        <div className="p-3 sm:p-4 md:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-neutral mb-1 sm:mb-2 line-clamp-2">
            {article.title}
          </h3>
          <div className="text-xs sm:text-sm text-secondary mb-1 sm:mb-2 flex flex-wrap items-center">
            <span className="font-medium">{article.source.name}</span>
            <span className="mx-1">•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-neutral mb-3 line-clamp-3 sm:line-clamp-4">
            {article.description || "No description available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm px-3 py-1 text-center bg-primary text-white rounded hover:bg-blue-700 transition-colors max-w-[120px] w-full sm:w-auto"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
