const express = require('express');
const router = express.Router();
const { getAllMovies ,getMoviesById , importPopularFromTMDB} = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:_id', getMoviesById);
router.post('/import/tmdb', importPopularFromTMDB);

module.exports = router;
