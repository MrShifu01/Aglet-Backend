import {useEffect} from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MoviePosters from "../components/MoviePosters";
import { useQueryClient } from 'react-query';
import axios from "axios";

const HomePage = () => {
  // Initialize the react-query client for caching and prefetching
  const queryClient = useQueryClient();

  // Function to fetch movies from the API
  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/all");
    return response.data;
  };

  useEffect(() => {
    // Prefetch the movies data when the component mounts
    queryClient.prefetchQuery("movies", fetchMovies);
  }, [queryClient]);

  return (
    // A flex container to center its children both horizontally and vertically
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Main container for the home page content */}
      <div className="main-container position-relative w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        {/* The hero section of the page */}
        <Hero className="position-relative" />
        
        {/* The categories section displaying different movie categories */}
        <Categories />

        {/* The movie posters section displaying movie covers */}
        <MoviePosters />
      </div>
    </div>
  );
};

// Exporting the HomePage component for use in other parts of the app
export default HomePage;
