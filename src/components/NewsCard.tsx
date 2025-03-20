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
  return (
    <div className="card">
      <div className="card-header">
        <img src={article.urlToImage} alt={article.title} />
      </div>
      <div className="card-content">
        <h3>{article.title}</h3>
        <h6 className="news-source">
          {article.source.name} ·{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </h6>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
