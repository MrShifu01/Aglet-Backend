import React from "react";
import FavouriteMovies from "../components/FavouriteMovies";
import Header from "../components/Header";

const FavouritesPage = () => {

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <div className="favourites-bg">
          <Header className="position-relative" />
          <div className="favourites-content">
            <FavouriteMovies />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
