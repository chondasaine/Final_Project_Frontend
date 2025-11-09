import "../SavedNewsPage/SavedNewsPage.css";
import { getTopKeywords } from "../../utils/keywords";
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
  const { topTwoKeywords, otherCount } = getTopKeywords(savedArticles);
  const formattedKeywords = topTwoKeywords.map(
    (kw) => kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase()
  );

  let keywordSummary = "";

  if (formattedKeywords.length > 0) {
    if (otherCount === 0) {
      keywordSummary = formattedKeywords.join(", ");
    } else {
      keywordSummary = `${formattedKeywords.join(
        ", "
      )} and ${otherCount} other${otherCount > 1 ? "s" : ""}`;
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogOut={handleLogOut}
        isSavedPage={true}
      />
      <section className="saved-news">
        <div className="saved-news__header">
          <h2 className="saved-news__title">Saved articles</h2>
          <h1 className="saved-news__heading">
            {username}, you have {savedArticles.length} saved article
            {savedArticles.length !== 1 ? "s" : ""}
          </h1>
          <p className="saved-news__keywords">By keywords: {keywordSummary}</p>
        </div>
        <NewsCardList
          articles={savedArticles}
          isSavedPage={true}
          isLoggedIn={isLoggedIn}
          onDelete={onDelete}
          savedArticles={savedArticles}
        />
      </section>
    </>
  );
}

export default SavedNewsPage;
