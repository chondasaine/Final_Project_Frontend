import "./NewsCard.css";

function NewsCard({ article }) {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  return (
    <article
      className="news-card"
      role="article"
      aria-labelledby={`title-${article.url}`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
        aria-label={`Read full article: ${title}`}
      >
        {urlToImage ? (
          <img src={urlToImage} alt={title} className="news-card__image" />
        ) : (
          <div className="news-card__image--fallback">No image available</div>
        )}
        <div className="news-card__text">
          <p className="news-card__date">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h3 id={`title-${article.url}`} className="news-card__title">
            {title}
          </h3>
          {description ? (
            <p className="news-card__description">
              {description.slice(0, 120)}...
            </p>
          ) : (
            <p className="news-card__description">No description available.</p>
          )}
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
