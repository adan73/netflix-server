const express = require('express');
const router = express.Router();
const { getAllMovies ,getMoviesById , importPopularFromTMDB,importPopularTvFromTMDB,addNewMovie,updateMovie, deleteMovie} = require('../controllers/moviesController');

router.get('/', getAllMovies);
router.get('/:_id', getMoviesById);
router.post('/import/tmdb', importPopularFromTMDB);
router.post('/import/tmdb/tv', importPopularTvFromTMDB);
router.post('/', addNewMovie);
router.put('/:id', updateMovie);   
router.delete('/:id', deleteMovie)
module.exports = router;
