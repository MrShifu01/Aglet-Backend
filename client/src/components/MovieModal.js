// Importing necessary React functionalities and dependencies
import { Modal, Button } from "react-bootstrap";

const MovieModal = ({ showModal, setShowModal, movie }) => {
  return (
    <Modal
      // Show the modal if 'showModal' is true
      show={showModal}

      // Hide the modal when the background or close button is clicked
      onHide={() => setShowModal(false)}

      // Add custom class to the modal for styling
      className="custom-modal"

      // Add a darker backdrop class after the modal is fully opened
      onEntered={() =>
        document
          .querySelector(".modal-backdrop")
          .classList.add("darker-backdrop")
      }
    >
      <Modal.Header className="border-0">
        {/* Display the movie title */}
        <Modal.Title>{movie?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column flex-md-row gap-5">
          {/* Display the movie backdrop image */}
          <img
            className="modal-movie-poster"
            src={`https://image.tmdb.org/t/p/w200/${movie?.backdrop_path}`}
            alt={movie?.title}
          />

          {/* Display the movie overview/description */}
          <p className="modal-text">{movie?.overview}</p>

          {/* Display the movie rating out of 10 */}
          <h2>{movie?.vote_average}/10</h2>
          <p>Released in {movie?.release_date.slice(0,4)} </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        {/* Button to close the modal */}
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the component for use in other parts of the app
export default MovieModal;
