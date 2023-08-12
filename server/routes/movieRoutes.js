import express from 'express';
import { getMovies, getFavouriteMovies, updateFavouriteMovie } from '../controllers/movieController.js';
const router = express.Router();

router.get('/', getMovies);
router.get('/favourites', getFavouriteMovies)
router.put('/:id/favourite', updateFavouriteMovie);

export default router;