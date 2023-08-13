// useMovies.js

import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get("/api/movies", {
    params: {
      page: pageParam,
    },
  });
  return response.data;
};

const useMovies = () => {
  const {
    data,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("movies", fetchMovies, {
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  return {
    moviesData: data,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useMovies;
