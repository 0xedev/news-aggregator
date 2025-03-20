interface NewsCardProps {
  article: {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: { name: string };
    publishedAt: string;
  };
}

function NewsCard({ article }: NewsCardProps) {
  // Create a truncated description to avoid overflow on small screens

  return (
    <div className="bg-white rounded-lg shadow-md mb-5 transition-transform hover:shadow-lg overflow-hidden">
      {/* Reduce hover scale effect which can cause layout issues on mobile */}
      <div className="sm:flex sm:flex-col md:block">
        {/* Image container with responsive height */}
        <div className="relative w-full">
          <img
            src={article.urlToImage || "/api/placeholder/400/200"}
            alt={article.title}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-lg"
            onError={(e) => {
              // Fallback for broken images
              (e.target as HTMLImageElement).src = "/api/placeholder/400/200";
            }}
          />
        </div>

        {/* Content area with better spacing for small screens */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Title with responsive font size */}
          <h3 className="text-base sm:text-lg font-semibold text-neutral mb-1 sm:mb-2 line-clamp-2">
            {article.title}
          </h3>

          {/* Source info with better small screen layout */}
          <div className="text-xs sm:text-sm text-secondary mb-1 sm:mb-2 flex flex-wrap items-center">
            <span className="font-medium">{article.source.name}</span>
            <span className="mx-1">•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>

          {/* Description with controlled height and line clamping */}
          <p className="text-sm text-neutral mb-3 line-clamp-3 sm:line-clamp-4">
            {article.description || "No description available"}
          </p>

          {/* Button that doesn't take too much space on mobile */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
