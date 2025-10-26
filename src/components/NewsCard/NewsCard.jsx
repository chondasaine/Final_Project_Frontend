import "./NewsCard.css";
import fallbackImage from "../../assets/fallback.jpg";

function NewsCard({ article }) {
  const { title, description, url, image, publishedAt, source } = article;

  return (
    <div className="news-card-wrapper">
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
          {image ? (
            <img
              src={image || fallbackImage}
              alt={title}
              className="news-card__image"
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
          ) : (
            <img
              src={fallbackImage}
              alt="No image available"
              className="news-card__image--fallback"
            />
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
              <p className="news-card__description">
                No description available.
              </p>
            )}
            <p className="news-card__source">
              {(source?.trim() ? source : "SOURCE UNKNOWN").toUpperCase()}
            </p>
          </div>
        </a>
      </article>
    </div>
  );
}

export default NewsCard;
