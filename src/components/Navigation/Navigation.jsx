import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/NewsExplorerlogo.svg";
import logoutwhite from "../../assets/logouticonwhite.svg";
import logoutblack from "../../assets/logouticonblack.svg";
import logoblack from "../../assets/NewsExplorerblack.svg";
import hamburgerIcon from "../../assets/menu.svg";
import closehamburger from "../../assets/closehamburger.svg";

function Navigation({
  onOpenLoginModal,
  currentUser,
  isLoggedIn,
  handleLogOut,
  isSavedPage,
  isLoginModalOpen,
  handleCloseModal,
}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);

  const navigationClass = `navigation ${
    isSavedPage ? "navigation_saved" : ""
  } ${isMenuOpen ? "navigation_open" : ""}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={navigationClass} aria-label="Main navigation">
      <div className="navigation__header">
        <Link to="/">
          <img
            src={isSavedPage ? logoblack : logo}
            alt="NewsExplorer logo"
            className="navigation__logo"
          />
        </Link>
        {isMobile ? (
          <button
            className="navigation__menu-button"
            aria-label="Hamburger menu"
            onClick={() => {
              if (isMenuOpen) {
                handleCloseModal();
              }
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <img
              src={isMenuOpen ? closehamburger : hamburgerIcon}
              alt="menu"
              className="navigation__menu-icon"
            />
          </button>
        ) : (
          <>
            <ul className="navigation__list navigation__list_open">
              <li className="navigation__link_home">
                <Link
                  to="/"
                  className={`navigation__link  ${
                    location.pathname === "/" ? "navigation__link_active" : ""
                  }`}
                >
                  Home
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/saved-news"
                      className={`navigation__link ${
                        location.pathname === "/saved-news"
                          ? "navigation__link_active"
                          : ""
                      }`}
                    >
                      Saved articles
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="navigation__signout-button"
                      onClick={handleLogOut}
                    >
                      {currentUser?.username
                        ? `${currentUser.username}`
                        : "Sign out"}
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
          </>
        )}
      </div>

      {isMenuOpen && !isLoginModalOpen ? (
        <>
          <div className="navigation__overlay"></div>
          <ul className="navigation__list navigation__list_open">
            <li className="navigation__link_home">
              <Link
                to="/"
                className={`navigation__link  ${
                  location.pathname === "/" ? "navigation__link_active" : ""
                }`}
              >
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/saved-news"
                    className={`navigation__link ${
                      location.pathname === "/saved-news"
                        ? "navigation__link_active"
                        : ""
                    }`}
                  >
                    Saved articles
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="navigation__signout-button"
                    onClick={handleLogOut}
                  >
                    {currentUser?.username
                      ? `${currentUser.username}`
                      : "Sign out"}
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
        </>
      ) : null}
    </nav>
  );
}

export default Navigation;
