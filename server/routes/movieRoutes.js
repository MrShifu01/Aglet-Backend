import express from 'express';
import { getMovies, getAllMovies, updateFavouriteMovie } from '../controllers/movieController.js';
const router = express.Router();

router.get('/', getMovies);
router.get('/all', getAllMovies)
router.put('/:id/favourite', updateFavouriteMovie);

export default router;