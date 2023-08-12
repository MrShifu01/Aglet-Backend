import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query"; // Notice the change from useInfiniteQuery to useQuery
import { useMutation } from "react-query";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const FavouriteMovies = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/favourites");
    return response.data;
  };

  const [movies, setMovies] = React.useState([]); // Initialize with empty array

  const { isError, error, isFetching } = useQuery(
    "favourite movies",
    fetchMovies,
    {
      onSuccess: (data) => {
        setMovies(data.movies); // Populate the state with the fetched data
      },
    }
  );

  const updateFavouriteMutation = useMutation(
    (movieId) => axios.put(`/api/movies/${movieId}/favourite`),
    {
      onSuccess: (data, movieId) => {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== movieId)
        ); // Remove movie from local state
        toast.success("Favourite status updated and movie removed!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
      onError: (error) => {
        console.error("Failed to update favourite status:", error);
        toast.error("Failed to update favourite status", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
      },
    }
  );

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

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
          </div>
        )}
      </div>

      <div className="movie-grid px-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="movie-poster-container border-0">
              <img
                className="movie-poster"
                onClick={() => handlePosterClick(movie)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="custom-modal"
        onEntered={() =>
          document
            .querySelector(".modal-backdrop")
            .classList.add("darker-backdrop")
        }
      >
        <Modal.Header className="border-0">
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-5">
            <img
              className="modal-movie-poster"
              src={`https://image.tmdb.org/t/p/w200/${selectedMovie?.backdrop_path}`}
              alt={selectedMovie?.title}
            />
            <p className="modal-text">{selectedMovie?.overview}</p>
            <h2>{selectedMovie?.vote_average}/10</h2>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FavouriteMovies;
