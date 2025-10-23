import "./Main.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Preloader from "../../components/Preloader/Preloader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";

function Main() {
  return (
    <main className="main">
      <section className="main__banner-section">
        <Link to="/"></Link>
      </section>

      <section className="main__search-section">
        <div className="hero">
          <div className="page__content">
            <Header />
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="main__results-section">
        <Preloader />
        <NewsCardList />
      </section>

      <section className="main__about-section">
        <About />
      </section>
    </main>
  );
}

export default Main;
