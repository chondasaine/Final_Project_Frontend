import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import { saveArticle } from "./utils/api";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import RegisterModal from "./components/modals/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/modals/LoginModal/LoginModal";
import { registerUser, loginUser } from "./utils/auth";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSaveArticle = (article) => {
    const token = localStorage.getItem("jwt");
    saveArticle(article, token)
      .then((savedArticle) => {
        setSavedArticles((prev) => {
          const alreadySaved = prev.some((a) => a.url === savedArticle.url);
          return alreadySaved ? prev : [...prev, savedArticle];
        });
      })
      .catch((err) => {
        console.error("Save failed:", err);
      });
  };

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const userData = await loginUser({ email, password });
      setIsLoggedIn(true);
      setCurrentUser(userData);
      handleCloseModal();
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleRegisterSubmit = async ({ userName, email, password }) => {
    try {
      const userData = await registerUser({ userName, email, password });
      setIsLoggedIn(true);
      setCurrentUser(userData);
      handleCloseModal();
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  onOpenLoginModal={handleOpenLoginModal}
                  onOpenRegisterModal={handleOpenRegisterModal}
                  onCloseModal={handleCloseModal}
                  isLoginModalOpen={isLoginModalOpen}
                />
              </>
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <NewsCardList
                savedArticles={savedArticles}
                onSave={handleSaveArticle}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
        </Routes>
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            handleCloseModal={handleCloseModal}
            onLogin={handleLoginSubmit}
            handleSwitchToRegister={handleSwitchToRegister}
          />
        )}
        {isRegisterModalOpen && (
          <RegisterModal
            isOpen={isRegisterModalOpen}
            handleCloseModal={handleCloseModal}
            onRegister={handleRegisterSubmit}
            handleSwitchToLogin={handleSwitchToLogin}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
