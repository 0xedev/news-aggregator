import Image from "next/image";
import Card from "../UI/Card";
import { formatDate } from "../../utils/dateFormatter";

export default function NewsCard({ article }) {
  const { title, description, urlToImage, source, publishedAt, url } = article;

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={handleClick}
      padding={false}
      className="h-full flex flex-col"
    >
      <div className="relative h-48 w-full">
        {urlToImage ? (
          <Image
            src={urlToImage}
            alt={title || "News image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {title || "No title"}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {source?.name || "Unknown source"} · {formatDate(publishedAt)}
        </p>
        <p className="text-sm text-gray-700 line-clamp-3 flex-grow">
          {description || "No description available"}
        </p>
        <p className="text-sm text-blue-500 mt-2">Read more</p>
      </div>
    </Card>
  );
}
