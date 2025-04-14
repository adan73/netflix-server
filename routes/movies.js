const express = require('express');
const router = express.Router();
const { getAllMovies ,getMoviesById , importPopularFromTMDB,importPopularTvFromTMDB} = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:_id', getMoviesById);
router.post('/import/tmdb', importPopularFromTMDB);
router.post('/import/tmdb/tv', importPopularTvFromTMDB);

module.exports = router;
