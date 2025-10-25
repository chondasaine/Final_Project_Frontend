import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles = [] }) {
  return (
    <section className="news-card-list">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </section>
  );
}

export default NewsCardList;
