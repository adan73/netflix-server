const Movie = require('../models/Movies');

const getAllMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (err) {
      console.error(' Failed to fetch Movies:', err);
      res.status(500).json({ message: 'Failed to get Movies', error: err });
    }
  };
  
module.exports = { getAllMovies };
