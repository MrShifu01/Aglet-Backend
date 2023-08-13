// Importing necessary React functionalities and other dependencies
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MovieModal from "./MovieModal";
import { useQuery } from "react-query";

const FavouriteMovies = () => {
  // Retrieve user data from local storage or default to an empty object
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  // State for modal visibility, the selected movie, and the user's favourite movies
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userFavourites, setUserFavourites] = useState(userData?.favourites || []);

  // Function to fetch movies from the API
  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/all");
    return response.data;
  };

  // Fetching movies using react-query's useQuery hook
  const {
    data: moviesData,
    error,
    isError,
    isFetching,
  } = useQuery("movies", fetchMovies);

  // Filter the movies based on user's favourites
  const favouriteMovies = Array.isArray(moviesData) 
    ? moviesData.filter((movie) => userFavourites.includes(movie._id))
    : [];

  // Handle click on the movie poster to open the modal
  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Handle adding/removing a movie from the user's favourites
  const toggleFavourite = async (movieId) => {
    const isFavourite = userFavourites.includes(movieId);
    let updatedFavourites;
    if (isFavourite) {
      await axios.put(`/api/users/${userData._id}/remove`, { movieId });
      updatedFavourites = userFavourites.filter((id) => id !== movieId);
      toast.success("Removed from favourites", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      await axios.put(`/api/users/${userData._id}/add`, { movieId });
      updatedFavourites = [...userFavourites, movieId];
      toast.success("Added to favourites", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    
    // Update the favourites in state and local storage
    setUserFavourites(updatedFavourites);
    userData.favourites = updatedFavourites;
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Display an error if there's an issue fetching movies
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
        {/* Map through the favourite movies to show them on the page */}
        {favouriteMovies.map((movie) => (
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
            </div>
          </div>
        ))}
        {favouriteMovies.length === 0 && !isFetching && (
          <div className="d-flex justify-content-center mt-5">
            <h3 className="text-white mt-3">No favourites yet</h3>
          </div>
        )}
      </div>
      {/* Render the MovieModal with the selected movie data */}
      <MovieModal
        showModal={showModal}
        setShowModal={setShowModal}
        movie={selectedMovie}
      />
    </>
  );
};

// Export the component for use in other parts of the app
export default FavouriteMovies;
