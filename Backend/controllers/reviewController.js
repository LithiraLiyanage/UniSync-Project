const PastPaperReview = require('../models/PastPaperReview');

// @desc    Add a review to a past paper
// @route   POST /api/reviews
// @access  Private (Student/Admin)
const addReview = async (req, res, next) => {
  try {
    const { paperId, rating, comment } = req.body;

    if (!paperId || !rating || !comment) {
      return res.status(400).json({ success: false, error: 'Please provide paperId, rating, and comment' });
    }

    // Check if user already reviewed this paper
    const existingReview = await PastPaperReview.findOne({ paperId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this paper' });
    }

    const review = await PastPaperReview.create({
      paperId,
      userId: req.user._id,
      rating: Number(rating),
      comment
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a specific past paper
// @route   GET /api/reviews/:paperId
// @access  Public
const getReviews = async (req, res, next) => {
  try {
    const reviews = await PastPaperReview.find({ paperId: req.params.paperId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin only)
const deleteReview = async (req, res, next) => {
  try {
    const review = await PastPaperReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview
};
