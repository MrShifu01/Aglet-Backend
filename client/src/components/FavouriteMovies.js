import React, { useState } from "react";
import MovieModal from "./MovieModal";
import { useQuery } from "react-query";
import axios from "axios";
import useFavourites from "./useFavourites";

const FavouriteMovies = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { userFavourites, toggleFavourite } = useFavourites();

  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/all");
    return response.data;
  };

  const {
    data: moviesData,
    error,
    isError,
    refetch,
    isFetching,
  } = useQuery("movies", fetchMovies);

  // Filter the movies based on userFavourites
  const favouriteMovies = Array.isArray(moviesData)
    ? moviesData.filter((movie) => userFavourites.includes(movie._id))
    : [];

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading-fav text-white position-absolute">
        My Favourites
      </h3>
      {isFetching && (
        <div className="d-flex justify-content-center mb-5">
          <div className="spinner-border text-light mt-5" role="status">
            <span className="visually-hidden">Fetching movies...</span>
          </div>
        </div>
      )}
      <div className="movie-grid px-5">
        {favouriteMovies?.map((movie) => (
          <div key={movie.id}>
            <div className="movie-poster-container border-0">
              <img
                onClick={() => handlePosterClick(movie)}
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <button
                className="favourite-icon"
                onClick={() =>
                  toggleFavourite(
                    movie._id,
                    userFavourites.includes(movie._id),
                    refetch
                  )
                }
              >
                <div className="heart-bg"></div>
                {!userFavourites.includes(movie._id) ? (
                  <img
                    className="favourites-heart"
                    src="heart-unfilled.png"
                    alt="heart outline"
                  />
                ) : (
                  <img
                    className="favourites-heart"
                    src="heart-filled.png"
                    alt="heart filled"
                  />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <MovieModal
        showModal={showModal}
        setShowModal={setShowModal}
        movie={selectedMovie}
      />
    </>
  );
};

export default FavouriteMovies;
