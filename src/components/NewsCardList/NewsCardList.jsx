import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list">
      <h1 className="news-card-list__section-title">Search Results</h1>
      <div className="news-card-list__grid">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
      <div className="news-card__show-more-wrapper">
        <button className="news-card-list__show-more-button">Show More</button>
      </div>
    </section>
  );
}

export default NewsCardList;
