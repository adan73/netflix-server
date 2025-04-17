const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { userId, movieId, reviewText, isPublic, rating } = req.body;

  try {
    const review = new Review({
      userId,
      movieId,
      reviewText,
      isPublic,
      rating
    });

    await review.save();
    res.status(201).json({ message: 'Review saved', review });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save review', error: err.message });
  }
};
const getUserReviewForMovie = async (req, res) => {
    const { userId, movieId } = req.params;
  
    try {
      const reviews = await Review.find({ userId, movieId });
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get review', error: err.message });
    }
  };
  
  const getPublicReviewsForMovie = async (req, res) => {
    const { movieId } = req.params;
  
    try {
      const reviews = await Review.find({
        movieId,
        isPublic: true,
      });
  
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch public reviews', error: err.message });
    }
  };
  

module.exports = {
    addReview,
    getUserReviewForMovie,
    getPublicReviewsForMovie,
  };
  