import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onOpenLoginModal }) {
  return (
    <header className="header" role="banner">
      <Navigation onOpenLoginModal={onOpenLoginModal} />
      <div className="header__container"></div>
    </header>
  );
}

export default Header;
