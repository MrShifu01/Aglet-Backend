// Importing necessary dependencies
import axios from "axios";
import { useInfiniteQuery } from "react-query";

// Function to fetch movies from the API with pagination
const fetchMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get("/api/movies", {
    params: {
      page: pageParam,
    },
  });
  return response.data;
};

const useMovies = () => {
  // Using react-query's useInfiniteQuery hook to fetch movies with pagination
  const {
    data,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("movies", fetchMovies, {
    // Determine the next page parameter based on the last fetched page's data
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  // Return necessary data and methods for use in components
  return {
    moviesData: data,           // Fetched movies data
    isError,                    // Boolean indicating if there was an error
    error,                      // Error object if there was an error
    isFetching,                 // Boolean indicating if data is currently being fetched
    hasNextPage,                // Boolean indicating if there are more pages to fetch
    fetchNextPage,              // Function to fetch the next page of movies
    isFetchingNextPage,         // Boolean indicating if the next page is currently being fetched
  };
};

// Export the custom hook for use in other parts of the app
export default useMovies;
