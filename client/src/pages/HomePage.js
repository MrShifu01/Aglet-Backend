import React, {useEffect} from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MoviePosters from "../components/MoviePosters";
import { useQueryClient } from 'react-query';
import axios from "axios";

const HomePage = () => {
  const queryClient = useQueryClient();

  const fetchMovies = async () => {
    const response = await axios.get("/api/movies/all");
    return response.data;
  };

  useEffect(() => {
    queryClient.prefetchQuery("movies", fetchMovies);
  }, [queryClient]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="main-container position-relative w-custom-90 h-custom-90 bg-dark rounded-3 overflow-hidden overflow-y-auto">
        <Hero className="position-relative" />
        <Categories />
        <MoviePosters />
      </div>
    </div>
  );
};

export default HomePage;
