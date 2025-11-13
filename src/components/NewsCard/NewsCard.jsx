import "./NewsCard.css";
import { useState } from "react";
import fallbackImage from "../../assets/fallback.jpg";
import bookmarkActive from "../../assets/bookmarkActive.svg";
import bookmarkDefault from "../../assets/bookmarkhover.svg";
import hoverDelete from "../../assets/hoverdelete.svg";

function NewsCard({
  article,
  isLoggedIn,
  onBookmark,
  isBookmarked,
  isSavedPage,
  onDelete,
}) {
  const { title, description, url, image, publishedAt, source } = article;

  const searchKeyword =
    article?._search?.keyword ?? article?.searchKeyword ?? "";

  const [errorMessage, setErrorMessage] = useState("");
  //const [isDeleteHover, setIsDeleteHover] = useState(false);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      setErrorMessage("Sign in to save articles");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    onBookmark(article);
  };

  return (
    <div className="news-card__wrapper">
      <article
        className="news-card"
        role="article"
        aria-labelledby={`title-${article.url}`}
      >
        <div className="news-card__button-wrapper">
          {isSavedPage && isLoggedIn ? (
            <div className="news-card__common-keywords">
              {article.keyword && (
                <span className="news-card__keyword-tag">
                  {article.keyword}
                </span>
              )}

              {searchKeyword && (
                <p className="news-card__search-keyword">
                  {searchKeyword.charAt(0).toUpperCase() +
                    searchKeyword.slice(1)}
                </p>
              )}
              <button
                type="button"
                className="news-card__delete-button"
                onClick={() => onDelete(article._id)}
                aria-label="Remove saved article"
              >
                <img
                  src={hoverDelete}
                  alt="Delete saved article"
                  className="news-card__delete-icon"
                />
                <p className="news-card__delete-message">Remove from saved</p>
              </button>
            </div>
          ) : (
            <button
              className="news-card__bookmark-button"
              onClick={handleBookmarkClick}
              aria-label="Save article"
            >
              <img
                src={isBookmarked ? bookmarkActive : bookmarkDefault}
                alt={isBookmarked ? "Remove bookmark" : "Save article"}
                className={`news-card__bookmark-icon ${
                  isBookmarked ? "news-card__bookmark-icon_active" : ""
                }`}
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
              <div className="news-card__description">
                {description.slice(0, 120)}...
              </div>
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
