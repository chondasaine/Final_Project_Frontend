import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import { saveArticle } from "./utils/api";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import RegisterModal from "./components/modals/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form data (e.g., login or register)
    handleCloseModal();
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
                  onOpenModal={handleOpenModal}
                  onCloseModal={handleCloseModal}
                  isModalOpen={isModalOpen}
                  onSubmit={handleSubmit}
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
        <RegisterModal
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
