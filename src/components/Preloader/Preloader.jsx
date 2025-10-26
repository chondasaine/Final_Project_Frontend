import "./Preloader.css";
import spinner from "../../assets/Ellipse.svg";
import notFound from "../../assets/notfound_v1.svg";

function Preloader({ noResults = false }) {
  return (
    <div className="preloader">
      {noResults ? (
        <>
          <img
            src={notFound}
            alt="No articles found"
            className="preloader-not-found__image"
          />
          <p className="preloader-not-found__text">Nothing Found</p>
          <p className="preloader__message">
            Sorry, but nothing matched
            <br /> your search terms.
          </p>
        </>
      ) : (
        <>
          <img src={spinner} alt="Loading..." className="preloader__spinner" />
          <p className="preloader__text">Searching for news...</p>
        </>
      )}
    </div>
  );
}

export default Preloader;
