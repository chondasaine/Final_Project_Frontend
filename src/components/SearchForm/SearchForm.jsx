import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery) {
      onSearch(cleanQuery);
      setClicked(true);
    }
  };

  return (
    <section className="search__section">
      <form
        className="search__form"
        aria-label="Search news articles"
        onSubmit={handleSearchSubmit}
      >
        <h1 className="search__header">What&apos;s going on in the world?</h1>
        <h3 className="search__content">
          Find the latest news on any topic and save them in your personal
          account.
        </h3>
        <div className="search__field-wrapper">
          <input
            id="search-bar"
            name="news-query"
            type="text"
            className="search__input"
            placeholder="Enter topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            id="search-button"
            className={
              clicked
                ? "search__submit-button search__submit-button-clicked"
                : "search__submit-button"
            }
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
