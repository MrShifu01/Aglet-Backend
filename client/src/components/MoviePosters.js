import React from "react";
import axios from "axios";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { toast } from "react-toastify";

const MoviePosters = () => {
  const [page, setPage] = React.useState(1);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get("/api/movies", {
      params: {
        page: pageParam,
      },
    });
    return response.data;
  };

  const {
    data,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["movies", page], fetchMovies, {
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  const queryClient = useQueryClient();

  const updateFavouriteMutation = useMutation(
    (movieId) => axios.put(`/api/movies/${movieId}/favourite`),
    {
      onSuccess: (data, variables) => {
        // Update the local data after mutation
        queryClient.setQueryData(["movies", page], (oldData) => {
          const newData = { ...oldData };
          for (let page of newData.pages) {
            const movieToUpdate = page.movies.find(
              (movie) => movie._id === variables
            );
            if (movieToUpdate) {
              movieToUpdate.isFavourite = !movieToUpdate.isFavourite;
              break; // break out of loop since we found the movie
            }
          }
          return newData;
        });
        toast.success("Favourite status updated!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      },
      
      onError: (error) => {
        console.error("Failed to update favourite status:", error);
        toast.error("Failed to update favourite status", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      },
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h3 className="movie-heading text-white">My List</h3>
      <div className="movie-grid px-5">
        {data?.pages.map((group, index) => (
          <React.Fragment key={index}>
            {group.movies.map((movie) => (
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
    </>
  );
};

export default MoviePosters;
