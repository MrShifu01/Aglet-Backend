import React from "react";
import Hero from "../components/Hero";
import FavouriteMovies from "../components/FavouriteMovies";

const FavouritesPage = () => {

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <Hero className="position-relative" />
        <FavouriteMovies />
      </div>
    </div>
  );
};

export default FavouritesPage;
