import "./Main.css";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Preloader from "../../components/Preloader/Preloader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";

import { useState } from "react";
import { fetchArticles } from "../../utils/api";

function Main({
  onOpenLoginModal,
  currentUser,
  isLoggedIn,
  handleLogOut,
  onBookmark,
  savedArticles,
  isAnyModalOpen,
  handleCloseModal,
}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await fetchArticles(query);
      setArticles(results);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hero">
        <header>
          <Header
            onOpenLoginModal={onOpenLoginModal}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            handleLogOut={handleLogOut}
            isAnyModalOpen={isAnyModalOpen}
            handleCloseModal={handleCloseModal}
          />
        </header>

        <section className="main__search-section">
          <div className="page__content">
            <SearchForm onSearch={handleSearch} />
          </div>
        </section>
      </div>
      <main className="main" role="main">
        <section className="main__results-section">
          {loading && <Preloader />}

          {error && <p className="error-message">{error}</p>}

          {!loading && articles.length > 0 && (
            <NewsCardList
              articles={articles.slice(0, visibleCount)}
              onShowMore={() => setVisibleCount((prev) => prev + 3)}
              showMoreVisible={visibleCount < articles.length}
              isSavedPage={false}
              isLoggedIn={isLoggedIn}
              onBookmark={onBookmark}
              savedArticles={savedArticles}
            />
          )}
          {!loading && hasSearched && articles.length === 0 && !error && (
            <Preloader noResults={true} />
          )}
        </section>
        <section className="main__about-section">
          <About />
        </section>
      </main>
    </>
  );
}

export default Main;
