import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import { saveArticle } from "./utils/api";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  const handleSaveArticle = (article) => {
    const token = localStorage.getItem("jwt");
    saveArticle(article, token)
      .then((savedArticle) => {
        setSavedArticles((prev) => {
          const alreadySaved = prev.some((a) => a.url === savedArticle.url);
          return alreadySaved ? prev : [...prev, savedArticles];
        });
      })
      .catch((err) => {
        console.error("Save failed:", err);
      });
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
