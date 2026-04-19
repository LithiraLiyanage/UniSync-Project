const express = require('express');
const { addReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addReview);

router.route('/:paperId')
  .get(getReviews); // get reviews by paperId

router.route('/:id')
  .delete(protect, admin, deleteReview); // Admin delete review by review ID

module.exports = router;
