import "../SavedNewsPage/SavedNewsPage.css";
import { getKeywords } from "../../utils/keywords";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

function SavedNewsPage({ username, savedArticles }) {
  const keywords = getKeywords(savedArticles);
  const topKeywords = keywords.slice(0, 3);
  const keywordCount = keywords.length - topKeywords.length;

  return (
    <section className="saved-news">
      <h2 className="saved-news__title"></h2>
      <h1 className="saved-news__heading">
        {username}, you have {savedArticles.length} saved article
        {savedArticles.length !== 1 ? "s" : ""}
      </h1>
      <p className="saved-news__keywords">
        By keywords: {topKeywords.join(", ")}
        {keywordCount > 0 &&
          `, and ${keywordCount} other${keywordCount > 1 ? "s" : ""}`}
      </p>

      <ul className="saved-news__list">
        {savedArticles.map((article) => (
          <NewsCardList
            articles={savedArticles}
            isSavedPage={true}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default SavedNewsPage;
