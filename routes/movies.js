const express = require('express');
const router = express.Router();
const { getAllMovies ,getMoviesById , importPopularFromTMDB,importPopularTvFromTMDB,addNewMovie} = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:_id', getMoviesById);
router.post('/import/tmdb', importPopularFromTMDB);
router.post('/import/tmdb/tv', importPopularTvFromTMDB);
router.post('/', addNewMovie);

module.exports = router;
