import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/" className="navigation__link">
        Home
      </Link>
      <Link to="/saved-news" className="navigation__link">
        Saved Articles
      </Link>
      <button className="navigation__button">Login</button>
    </nav>
  );
}

export default Navigation;
