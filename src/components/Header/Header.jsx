import "./Header.css";
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
      <Navigation
        onOpenLoginModal={onOpenLoginModal}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
        isSavedPage={isSavedPage}
        isAnyModalOpen={isAnyModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <div className="header__container"></div>
    </header>
  );
}

export default Header;
