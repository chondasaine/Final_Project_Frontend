import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  onShowMore,
  showMoreVisible,
  onDelete,
  isSavedPage,
  isLoggedIn,
  onBookmark,
  savedArticles,
}) {
  return (
    <section className="news-card-list">
      {!isSavedPage && (
        <h1 className="news-card-list__section-title">Search Results</h1>
      )}
      <div className="news-card-list__grid">
        {articles.map((article) => {
          const isBookmarked = (savedArticles || []).some(
            (saved) => saved.url === article.url
          );

          return (
            <NewsCard
              key={article._id || article.url}
              article={article}
              isSavedPage={isSavedPage}
              isLoggedIn={isLoggedIn}
              onBookmark={onBookmark}
              onDelete={onDelete}
              isBookmarked={isBookmarked}
            />
          );
        })}
      </div>
      {!isSavedPage && showMoreVisible && (
        <div className="news-card__show-more-wrapper">
          <button
            className="news-card-list__show-more-button"
            onClick={onShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
