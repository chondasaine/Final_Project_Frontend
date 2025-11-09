import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import RegisterModal from "./components/modals/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/modals/LoginModal/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SavedNewsPage from "./pages/SavedNewsPage/SavedNewsPage";
import { compareUrl } from "./utils/compareUrl";
import {
  fetchSavedArticlesFromLocal,
  saveSavedArticlesToLocal,
} from "./utils/storage";
import {
  fakeRegisterUser,
  fakeLoginUser,
  fakeSaveBookmark,
  removeFakeSaveBookmark,
  getFakeBookmarks,
} from "./utils/mockApi";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
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
      const userData = await fakeLoginUser({ email, password });
      setIsLoggedIn(true);
      setCurrentUser(userData);
      handleCloseModal();
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleRegisterSubmit = async ({ userName, email, password }) => {
    try {
      const userData = await fakeRegisterUser({ userName, email, password });
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

  const handleRegister = async (formData) => {
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
  };

  const handleBookmark = async (article) => {
    console.log("Bookmark clicked:", article);
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
      console.log("Received article:", article);
      console.log("Received article.url:", article?.url);

      if (!article?.url) return;

      const res = await fakeSaveBookmark(article);

      setSavedArticles((prev) => {
        const id = compareUrl(article.url);
        console.log(id, prev);
        const exists = prev.some((a) => compareUrl(a.url) === id);
        console.log(exists, res);
        return exists ? prev : [...prev, res.saved];
      });
    } catch (err) {
      console.error("Save failed:", err.message);
    }
  };
  console.log(savedArticles);

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

  /*useEffect(() => {
    if (!isLoggedIn) {
      const local = fetchSavedArticlesFromLocal();
      const seen = new Set();
      const unique = [];
      for (const a of local) {
        const id = compareUrl(a?.url);
        if (id && !seen.has(id)) {
          seen.add(id);
          unique.push(a);
        }
      }
      setSavedArticles(unique);
    }
  }, [isLoggedIn]);*/

  /*useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const serverList = await getFakeBookmarks();
        const localList = fetchSavedArticlesFromLocal();
        const serverById = new Map(
          serverList.map((a) => [compareUrl(a.url), a])
        );
        const localById = new Map(localList.map((a) => [compareUrl(a.url), a]));
        const missing = [];
        for (const [id, item] of localById.entries()) {
          if (!serverById.has(id)) missing.push(item);
        }
        if (missing.length) {
          await Promise.allSettled(missing.map((a) => fakeSaveBookmark(a)));
        }
        const merged = await getFakeBookmarks();
        setSavedArticles(merged);
        saveSavedArticlesToLocal(merged);
      } catch (err) {
        console.error("Error merging bookmarks:", err);
      }
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    saveSavedArticlesToLocal(savedArticles);
  }, [savedArticles]);*/

  const handleDelete = (id) => {
    setSavedArticles((prev) => prev.filter((article) => article._id !== id));
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setToken("");
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
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  handleLogOut={handleLogOut}
                  onBookmark={handleBookmark}
                  savedArticles={savedArticles}
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
