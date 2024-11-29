const express = require('express');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

// Get all movies
router.get('/', getAllMovies);

// Get a movie by ID
router.get('/:id', getMovieById);

// Create a new movie
router.post('/', createMovie);

// Update a movie
router.put('/:id', updateMovie);

// Delete a movie
router.delete('/:id', deleteMovie);

module.exports = router;
