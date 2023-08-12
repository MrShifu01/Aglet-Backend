import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MoviePosters from "../components/MoviePosters";

const HomePage = () => {

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <Hero className="position-relative" />
        <Categories />
        <MoviePosters />
      </div>
    </div>
  );
};

export default HomePage;
