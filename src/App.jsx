import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SearchForm from "./components/SearchForm/SearchForm";
import Preloader from "./components/Preloader/Preloader";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
                <Preloader />
                <NewsCardList />
                <About />
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
