const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: true,
      // Accept all possible values - both old and new submissions
      enum: ['spam', 'inappropriate', 'misleading', 'scam', 'other',
             'Spam', 'Inappropriate content', 'Fake service', 'Scam', 'Other'],
    },
    details: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
      default: 'pending',
    },
    adminNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
