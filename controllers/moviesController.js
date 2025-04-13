const Movie = require('../models/Movies');
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY || '34862e24390a65f70fa346fda0be57f4';

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error('Failed to fetch Movies:', err);
    res.status(500).json({ message: 'Failed to get Movies', error: err });
  }
};

const getMoviesById = async (req, res) => {
  const moviesId = req.params._id;
  try {
    const movie = await Movie.findById(moviesId);
    if (!movie) {
      return res.status(404).json({ message: 'movie/series not found' });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movie/series', error: err.message });
  }
};

const importPopularFromTMDB = async (req, res) => {
  try {
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );
    const data = await tmdbRes.json();

    const movies = data.results.map((movie) => ({
      title: movie.title,
      description: movie.overview,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      titleImage: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      isSeries: false,
      cover: false,
      lists: ['popular'],
      screenshots: [
        `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      ],
      cast: 'Unknown (from TMDB)',
      Director: 'Unknown',
      "Maturity rating": '16+',
      type: 'Action',
      year: movie.release_date?.split('-')[0],
    }));

    await Movie.insertMany(movies);
    res.status(201).json({ message: 'Movies imported!', count: movies.length });
  } catch (err) {
    console.error('❌ Failed to import from TMDB:', err);
    res.status(500).json({ message: 'Failed to import movies', error: err.message });
  }
};

module.exports = {
  getAllMovies,
  getMoviesById,
  importPopularFromTMDB,
};
