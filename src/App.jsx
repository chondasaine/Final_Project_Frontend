import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import RegisterModal from "./components/modals/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/modals/LoginModal/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SavedNewsPage from "./pages/SavedNewsPage/SavedNewsPage";
import { compareUrl } from "./utils/compareUrl";
import {
  fakeRegisterUser,
  fakeSaveBookmark,
  fakeUsers,
  removeFakeSaveBookmark,
} from "./utils/mockApi";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [username, setUsername] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const isAnyModalOpen = isLoginModalOpen || isRegisterModalOpen;
  const [currentUser, setCurrentUser] = useState(null);
  //const [token, setToken] = useState("");
  //const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  /*const handleSaveArticle = (article) => {
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
  };*/

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const user = fakeUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error("Invalid credentials");

      setIsLoggedIn(true);
      setCurrentUser(user);
      handleCloseModal();
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleRegisterSubmit = async ({ userName, email, password }) => {
    try {
      await fakeRegisterUser({ userName, email, password });
      setIsLoggedIn(true);
      setCurrentUser({ username: userName, email });
      setRegisterError("");
      handleCloseModal();
    } catch (err) {
      setRegisterError(err.message);
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

  /*const handleRegister = async (formData) => {
    try {
      const res = await fakeRegisterUser(formData);
      setIsLoggedIn(true);
      setUsername(formData.username);
      setToken(res.token);
    } catch (err) {
      setRegisterError(err.message);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const res = await fakeLoginUser(formData);
      setIsLoggedIn(true);
      setUsername(res.username);
      setToken(res.token);
    } catch (err) {
      setLoginError(err.message);
    }
  };*/

  const handleBookmark = async (article) => {
    if (!article?.url) return;
    try {
      const id = compareUrl(article.url);
      const existing = savedArticles.find((a) => compareUrl(a.url) === id);

      if (existing) {
        await handleRemoveBookmark(existing._id);
      } else {
        await handleSaveBookmark(article);
      }
    } catch (err) {
      console.error("Bookmark failed to save:", err.message);
    }
  };

  const handleSaveBookmark = async (article) => {
    try {
      if (!article?.url) return;

      const res = await fakeSaveBookmark(article);

      setSavedArticles((prev) => {
        const id = compareUrl(article.url);
        const exists = prev.some((a) => compareUrl(a.url) === id);
        return exists ? prev : [...prev, res.saved];
      });
    } catch (err) {
      console.error("Save failed:", err.message);
    }
  };

  const handleRemoveBookmark = async (articleId) => {
    try {
      const res = await removeFakeSaveBookmark(articleId);
      setSavedArticles((prev) =>
        prev.filter((article) => article._id !== res.removedId)
      );
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  const handleDelete = (id) => {
    setSavedArticles((prev) => prev.filter((article) => article._id !== id));
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
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
                  isAnyModalOpen={isAnyModalOpen}
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  handleLogOut={handleLogOut}
                  onBookmark={handleBookmark}
                  savedArticles={savedArticles}
                  handleCloseModal={handleCloseModal}
                />
              </>
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNewsPage
                  savedArticles={savedArticles}
                  onDelete={handleDelete}
                  username={currentUser?.username}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  handleLogOut={handleLogOut}
                />
              </ProtectedRoute>
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
            registerError={registerError}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
