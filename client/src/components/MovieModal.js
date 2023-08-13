import React from "react";
import { Modal, Button } from "react-bootstrap";

const MovieModal = ({ showModal, setShowModal, movie }) => {
  return (
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
        <Modal.Title>{movie?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-5">
          <img
            className="modal-movie-poster"
            src={`https://image.tmdb.org/t/p/w200/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <p className="modal-text">{movie?.overview}</p>
          <h2>{movie?.vote_average}/10</h2>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
