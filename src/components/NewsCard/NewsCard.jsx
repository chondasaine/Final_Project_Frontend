import "./NewsCard.css";
import { useState } from "react";
import fallbackImage from "../../assets/fallback.jpg";
import bookmarkActive from "../../assets/bookmarkActive.svg";
import bookmarkDefault from "../../assets/bookmarkDefault.svg";

function NewsCard({
  article,
  isLoggedIn,
  onBookmark,
  isBookmarked,
  isSavedPage,
  onDelete,
}) {
  const { title, description, url, image, publishedAt, source } = article;
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookmarkClick = () => {
    console.log("Bookmark clicked:", article.title);
    if (!isLoggedIn) {
      setErrorMessage("Sign in to save articles");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    onBookmark?.(article);
  };

  return (
    <div className="news-card-wrapper">
      <article
        className="news-card"
        role="article"
        aria-labelledby={`title-${article.url}`}
      >
        <div className="news-card__button-wrapper">
          {isSavedPage && isLoggedIn && article.keyword && (
            <span className="news-card__keyword-tag">{article.keyword}</span>
          )}

          {isSavedPage && isLoggedIn ? (
            <button
              className="news-card__delete-button"
              onClick={() => onDelete(article._id)}
              aria-label="Remove saved article"
            />
          ) : (
            <button
              className="news-card__bookmark-button"
              onClick={handleBookmarkClick}
              aria-label="Save article"
            >
              <img
                src={isBookmarked ? bookmarkActive : bookmarkDefault}
                alt={isBookmarked ? "Remove bookmark" : "Save article"}
                className="bookmark-icon"
              />
            </button>
          )}
        </div>
        {errorMessage && (
          <p className="news-card__error-message" aria-live="assertive">
            {errorMessage}
          </p>
        )}
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
