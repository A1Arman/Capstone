const Movie = require('../models/movieModel');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, year, quantity } = req.body;
    // Check if release year is a number and is at least 1900
    if (isNaN(year) || year < 1900) {
      throw new Error('Please enter a valid release year (1900 or later).');
  }

    const newMovie = await Movie.create({ title, genre, release_year: year, quantity });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: `Error creating movie: ${error.message}`, error });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    console.log('HELLO')
    const movie = await Movie.findByPk(req.params.id);
    console.log(movie)
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const { title, genre, release_year, quantity } = req.body;
    await movie.update({ title, genre, release_year, quantity });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await movie.destroy();
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
