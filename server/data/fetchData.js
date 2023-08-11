import fetch from "node-fetch";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();
import Movie from "../models/movieModel.js";

// Variables for the API (The Movie DB)
const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmJjNDk5ZTYyYTE4MGMyMjhmOGE1MjcwNjkzY2ZmOCIsInN1YiI6IjY0ZDViYzM4YmYzMWYyMDFjYThiNGI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZ-1xYo938BW9JZSD3ZBXPNMCYIFpQ0Fv7HKMAu9Fo0",
  },
};

// Fetch data from the API (The Movie DB)
const fetchData = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results;
    importData(movies);
  } catch (error) {
    console.log(error);
  }
};

// Import movie data into MongoDB
const importData = async (movies) => {
  try {
    await Movie.deleteMany();

    // Take the first 3 movies from the movies array
    const limitedMovies = movies.slice(0, 45);

    await Movie.insertMany(limitedMovies);

    console.log("Data import success");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error.message);
    process.exit(1);
  }
};

// Connect to the Database first, then fetch the data
connectDB().then(() => {
  fetchData();
});
