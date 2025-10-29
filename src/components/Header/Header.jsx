import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onOpenModal }) {
  return (
    <header className="header" role="banner">
      <Navigation onOpenModal={onOpenModal} />
      <div className="header__container"></div>
    </header>
  );
}

export default Header;
