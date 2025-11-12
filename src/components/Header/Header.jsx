import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({
  onOpenLoginModal,
  currentUser,
  isLoggedIn,
  handleLogOut,
  isSavedPage,
  isAnyModalOpen,
  handleCloseModal,
}) {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/"></Link>
      </div>
      <Navigation
        onOpenLoginModal={onOpenLoginModal}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
        isSavedPage={isSavedPage}
        isAnyModalOpen={isAnyModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </header>
  );
}

export default Header;
