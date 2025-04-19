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
  const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { reviewText, isPublic, rating } = req.body;
  
    try {
      const updated = await Review.findByIdAndUpdate(
        reviewId,
        { reviewText, isPublic, rating },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: 'Review not found' });
  
      res.json({ message: 'Review updated', review: updated });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update review', error: err.message });
    }
  };
  
  const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
  
    try {
      const deleted = await Review.findByIdAndDelete(reviewId);
      if (!deleted) return res.status(404).json({ message: 'Review not found' });
  
      res.json({ message: 'Review deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete review', error: err.message });
    }
  };
  
  module.exports = {
    addReview,
    getUserReviewForMovie,
    getPublicReviewsForMovie,
    updateReview,
    deleteReview
  };