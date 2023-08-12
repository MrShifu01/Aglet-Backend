import React from "react";
import axios from "axios";
import { useQuery } from "react-query"; // Notice the change from useInfiniteQuery to useQuery
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const FavouriteMovies = () => {
  const queryClient = useQueryClient();
  
  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/favourites");
    return response.data;
  };

  const [movies, setMovies] = React.useState([]); // Initialize with empty array

  const { data, isError, error, isFetching } = useQuery("favourite movies", fetchMovies, {
    onSuccess: (data) => {
      setMovies(data.movies);  // Populate the state with the fetched data
    }
  });

  const updateFavouriteMutation = useMutation(
    (movieId) => axios.put(`/api/movies/${movieId}/favourite`),
    {
      onSuccess: (data, movieId) => {
        setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== movieId)); // Remove movie from local state
        toast.success("Favourite status updated and movie removed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      },
      onError: (error) => {
        console.error("Failed to update favourite status:", error);
        toast.error("Failed to update favourite status", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      },
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading text-white">Favourites</h3> 

      <div className="d-flex justify-content-center mb-5">
        {isFetching && (
          <div className="spinner-border text-light mt-5" role="status">
            <span className="visually-hidden">Fetching movies...</span>
          </div>)}
      </div>

      <div className="movie-grid px-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="movie-poster-container">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
                                <button
                    className="favourite-icon"
                    onClick={() => updateFavouriteMutation.mutate(movie._id)}
                  >
                    <div className="heart-bg"></div>
                    {!movie.isFavourite ? (
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
    </>
  );
};

export default FavouriteMovies;
