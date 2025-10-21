import "./Header.css";
import Navigation from "../Navigation/Navigation";
import logo from "../../assets/NewsExplorerlogo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="NewsExplorer logo" className="header__logo" />
        </Link>
        <Link to="/" className="header__home-button">
          Home
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
