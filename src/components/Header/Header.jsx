import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header" role="banner">
      <Navigation />
      <div className="header__container"></div>
    </header>
  );
}

export default Header;
