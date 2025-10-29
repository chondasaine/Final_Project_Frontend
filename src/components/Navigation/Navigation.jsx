import "./Navigation.css";
import { Link } from "react-router-dom";
import logo from "../../assets/NewsExplorerlogo.svg";

function Navigation({ onOpenModal }) {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/">
        <img src={logo} alt="NewsExplorer logo" className="navigation__logo" />
      </Link>
      <ul className="navigation__list">
        <li>
          <Link to="/" className="navigation__link">
            Home
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onOpenModal}
            className="navigation__button"
          >
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
