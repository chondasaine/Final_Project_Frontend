import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery) {
      onSearch(cleanQuery);
    }
  };

  return (
    <section className="search-section">
      <form
        className="search-form"
        aria-label="Search news articles"
        onSubmit={handleSubmit}
      >
        <h1 className="search__header">What's going on in the world?</h1>
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
            className="search__submit-button"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
