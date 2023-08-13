import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import MovieModal from "./MovieModal";
import { useInfiniteQuery } from "react-query";

const MoviePosters = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userFavourites, setUserFavourites] = useState(() => {
    return userData?.favourites || [];
  });
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      userData.favourites = userFavourites;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userFavourites]);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get("/api/movies", {
      params: {
        page: pageParam,
      },
    });
    return response.data;
  };

  const {
    data: moviesData,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("movies", fetchMovies, {
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const toggleFavourite = async (movieId) => {
    const isFavourite = userFavourites.includes(movieId);
    if (isFavourite) {
      await axios.put(`/api/users/${userData._id}/remove`, { movieId });
      setUserFavourites((prev) => {
        const updatedFavourites = prev.filter((id) => id !== movieId);
        return updatedFavourites;
      });
      toast.success("Removed from favourites", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      await axios.put(`/api/users/${userData._id}/add`, { movieId });
      setUserFavourites((prev) => {
        const updatedFavourites = [...prev, movieId];
        return updatedFavourites;
      });
      toast.success("Added to favourites", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading text-white">My List</h3>
      <div className="movie-grid px-5">
        {moviesData?.pages?.map((group, index) => (
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
                      onClick={() => toggleFavourite(movie._id)}
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
