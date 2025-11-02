import "./Main.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Preloader from "../../components/Preloader/Preloader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";

import { useState } from "react";
import { fetchArticles } from "../../utils/api";
import ModalWithForm from "../../components/modals/ModalWithForm/ModalWithForm";

function Main({ onOpenLoginModal, currentUser, isLoggedIn, handleLogOut }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setvisibleCount] = useState(3);

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
    <main className="main">
      <section className="main__banner-section">
        <Link to="/"></Link>
      </section>

      <section className="main__search-section">
        <div className="hero">
          <div className="page__content">
            <Header
              onOpenLoginModal={onOpenLoginModal}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              handleLogOut={handleLogOut}
            />
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>
      <section className="main__results-section">
        {loading && <Preloader />}

        {error && <p className="error-message">{error}</p>}

        {!loading && articles.length > 0 && (
          <NewsCardList
            articles={articles.slice(0, visibleCount)}
            onShowMore={() => setvisibleCount((prev) => prev + 3)}
            showMoreVisible={visibleCount < articles.length}
            isSavedPage={false}
            isLoggedIn={isLoggedIn}
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
  );
}

export default Main;
