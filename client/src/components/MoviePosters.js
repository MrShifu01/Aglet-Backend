// Importing necessary React functionalities and other dependencies
import { useEffect, useState } from "react";
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
    // ... (same as the original code)
  };

  // Display an error if there's an issue fetching movies
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading text-white">My List</h3>
      <div className="movie-grid px-5">
        {/* Display movies in a grid */}
        {moviesData?.pages?.map((group, index) => (
          <React.Fragment key={index}>
            {group.movies.map((movie) => (
              // ... (same as the original code)
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* Load more button */}
      <div className="d-flex justify-content-center mb-5">
        // ... (same as the original code)
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
