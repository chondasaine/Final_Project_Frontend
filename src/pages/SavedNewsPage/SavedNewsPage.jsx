import "../SavedNewsPage/SavedNewsPage.css";
import { getKeywords } from "../../utils/keywords";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import Header from "../../components/Header/Header";

function SavedNewsPage({
  username,
  savedArticles,
  isLoggedIn,
  onDelete,
  currentUser,
  handleLogOut,
}) {
  const keywords = getKeywords(savedArticles);
  const topKeywords = keywords.slice(0, 3);
  const keywordCount = keywords.length - topKeywords.length;

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogOut={handleLogOut}
        isSavedPage={true}
      />
      <section className="saved-news">
        <h2 className="saved-news__title">Saved articles</h2>
        <h1 className="saved-news__heading">
          {username}, you have {savedArticles.length} saved article
          {savedArticles.length !== 1 ? "s" : ""}
        </h1>
        <p className="saved-news__keywords">
          By keywords: {""}
          <span className="saved-news__keywords-bold">
            {topKeywords.join(", ")}
            {keywordCount > 0 &&
              `, and ${keywordCount} other${keywordCount > 1 ? "s" : ""}`}
          </span>
        </p>

        <ul className="saved-news__list">
          <NewsCardList
            articles={savedArticles}
            isSavedPage={true}
            isLoggedIn={isLoggedIn}
            onDelete={onDelete}
          />
        </ul>
      </section>
    </>
  );
}

export default SavedNewsPage;
