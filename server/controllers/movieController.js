import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/movieModel.js";

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const limit = 9;
        const startIndex = (page - 1) * limit;

        const movies = await Movie.find().skip(startIndex).limit(limit);
        const totalDocuments = await Movie.countDocuments();

        const nextPage = page * limit < totalDocuments ? parseInt(page) + 1 : null;

        res.json({
            movies,
            nextPage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Fetch favourite movies
// @route   GET /api/movies/favourites
// @access  Public
const getFavouriteMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find({ isFavourite: true });
        res.json({
            movies,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Toggle favourite status of a movie
// @route   PUT /api/movies/:id/favourite
// @access  Private
const updateFavouriteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the movie by its ID
        const movie = await Movie.findById(id);
        
        // If the movie does not exist, return an error
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Toggle the isFavourite field
        movie.isFavourite = !movie.isFavourite;

        // Save the updated movie
        await movie.save();

        res.json(movie);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





export { getMovies, getFavouriteMovies, updateFavouriteMovie };