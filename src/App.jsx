import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import Preloader from "./components/Preloader/Preloader";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
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
          <Route path="/saved-news" element={<NewsCardList />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
