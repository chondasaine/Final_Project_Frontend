import "./Main.css";
import { Link } from "react-router-dom";
import mainImage from "../../assets/mainImage.png";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import Preloader from "../../components/Preloader/Preloader";
import SearchForm from "../../components/SearchForm/SearchForm";
import About from "../../components/About/About";

function Main() {
  return (
    <main className="main">
      <section className="main__banner-section">
        <Link to="/">
          <img
            src={mainImage}
            alt="main banner image"
            className="main__banner"
          />
        </Link>
      </section>

      <section className="main__search-section">
        <SearchForm />
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
