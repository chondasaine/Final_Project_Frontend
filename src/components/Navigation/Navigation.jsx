import "./Navigation.css";
import { Link } from "react-router-dom";
import logo from "../../assets/NewsExplorerlogo.svg";
import logoutwhite from "../../assets/logouticonwhite.svg";
import logoutblack from "../../assets/logouticonblack.svg";
import logoblack from "../../assets/NewsExplorerblack.svg";

function Navigation({
  onOpenLoginModal,
  currentUser,
  isLoggedIn,
  handleLogOut,
  isSavedPage,
}) {
  const navigationClass = `navigation ${isSavedPage ? "navigation_saved" : ""}`;

  return (
    <nav className={navigationClass} aria-label="Main navigation">
      <Link to="/">
        <img
          src={isSavedPage ? logoblack : logo}
          alt="NewsExplorer logo"
          className="navigation__logo"
        />
      </Link>
      <ul className="navigation__list">
        <li>
          <Link to="/" className="navigation__link">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/saved-news" className="navigation__link">
                Saved articles
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="navigation__signout-button"
                onClick={handleLogOut}
              >
                {currentUser?.username ? `${currentUser.username}` : "Sign out"}
                <img
                  src={isSavedPage ? logoutblack : logoutwhite}
                  alt="Sign out icon"
                  className="navigation__signout-icon"
                />
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="navigation__button"
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
