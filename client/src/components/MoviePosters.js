// Importing necessary React functionalities and other dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import MovieModal from "./MovieModal";
import { useInfiniteQuery } from "react-query";

const MoviePosters = () => {
  // Retrieve user data from local storage or default to an empty object
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  // State for modal visibility, the selected movie, and the user's favourite movies
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userFavourites, setUserFavourites] = useState(() => {
    return userData?.favourites || [];
  });
  const { isLoggedIn } = useAuth();

  // Update local storage whenever userFavourites state changes
  useEffect(() => {
    if (isLoggedIn) {
      userData.favourites = userFavourites;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userFavourites]);

  // Function to fetch movies from the API with pagination
  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get("/api/movies", {
      params: {
        page: pageParam,
      },
    });
    return response.data;
  };

  // Fetching movies using react-query's useInfiniteQuery hook for pagination
  const {
    data: moviesData,
    isError,
    error,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("movies", fetchMovies, {
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  // Handle click on the movie poster to open the modal
  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Handle adding/removing a movie from the user's favourites
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

  // Display an error if there's an issue fetching movies
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Display a loading message while movies are being fetched
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-light mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <h3 className="movie-heading text-white">My List</h3>
      <div className="movie-grid px-5">
        {/* Display movies in a grid */}
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
      {/* Load more button */}
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

      {/* Movie details modal */}
      <MovieModal
        showModal={showModal}
        setShowModal={setShowModal}
        movie={selectedMovie}
      />
    </>
  );
};

// Export the component for use in other parts of the app
export default MoviePosters;
