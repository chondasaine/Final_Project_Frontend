import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onOpenLoginModal, currentUser, isLoggedIn, handleLogOut }) {
  return (
    <header className="header" role="banner">
      <Navigation
        onOpenLoginModal={onOpenLoginModal}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
      />
      <div className="header__container"></div>
    </header>
  );
}

export default Header;
