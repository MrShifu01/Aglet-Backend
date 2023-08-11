import mongoose from 'mongoose'; 

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    required: true
  },
  backdrop_path: {
    type: String,
    default: null
  },
  genre_ids: [{
    type: Number
  }],
  id: {
    type: Number,
    required: true,
    unique: true
  },
  original_language: {
    type: String,
    required: true
  },
  original_title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    default: null
  },
  popularity: {
    type: Number,
    required: true
  },
  poster_path: {
    type: String,
    default: null
  },
  release_date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  video: {
    type: Boolean,
    required: true
  },
  vote_average: {
    type: Number,
    required: true
  },
  vote_count: {
    type: Number,
    required: true
  }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
