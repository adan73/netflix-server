const express = require('express');
const router = express.Router();
const { addReview, getUserReviewForMovie ,getPublicReviewsForMovie ,updateReview, deleteReview} = require('../controllers/reviewController');

router.post('/', addReview); 
router.get('/:userId/:movieId', getUserReviewForMovie); 
router.get('/:movieId', getPublicReviewsForMovie); 
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;
