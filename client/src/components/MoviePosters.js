import React, { useState } from "react";
import { useAuth } from "./useAuth";
import MovieModal from "./MovieModal";

import useFavourites from "./useFavourites";
import useMovies from "./useMovies";

const MoviePosters = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { isLoggedIn } = useAuth();
  const { userFavourites, toggleFavourite } = useFavourites();
  const {
    moviesData,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovies();

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading text-white">My List</h3>
      <div className="movie-grid px-5">
        {moviesData?.pages.map((group, index) => (
          <React.Fragment key={index}>
            {group.movies.map((movie) => (
              <div key={movie.id}>
                <div className="movie-poster-container border-0">
                  <img
                    onClick={() => handlePosterClick(movie)}
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {isLoggedIn && (
                    <button
                      className="favourite-icon"
                      onClick={() =>
                        toggleFavourite(
                          movie._id,
                          userFavourites.includes(movie._id)
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
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="d-flex justify-content-center mb-5">
        <button
          className="more-button border-0 bg-transparent my-5 text-white opacity-25"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <div className="spinner-border text-light mt-5" role="status">
              <span className="visually-hidden">Fetching movies...</span>
            </div>
          ) : hasNextPage ? (
            <img src="/plus.png" width={"40px"} alt="load more" />
          ) : isFetching ? (
            "Fetching movies..."
          ) : (
            "No More Movies :("
          )}
        </button>
      </div>

      <MovieModal
        showModal={showModal}
        setShowModal={setShowModal}
        movie={selectedMovie}
      />
    </>
  );
};

export default MoviePosters;
