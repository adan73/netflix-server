const express = require('express');
const router = express.Router();
const { addReview, getUserReviewForMovie ,getPublicReviewsForMovie} = require('../controllers/reviewController');

router.post('/', addReview); 
router.get('/:userId/:movieId', getUserReviewForMovie); 
router.get('/:movieId', getPublicReviewsForMovie); 

module.exports = router;
