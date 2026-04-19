const mongoose = require('mongoose');

const pastPaperReviewSchema = new mongoose.Schema(
  {
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PastPaper',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PastPaperReview = mongoose.model('PastPaperReview', pastPaperReviewSchema);

module.exports = PastPaperReview;
