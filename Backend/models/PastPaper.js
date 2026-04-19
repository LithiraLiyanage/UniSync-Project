const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a paper title'],
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    year: {
      type: Number,
      required: [true, 'Please add a year'],
    },
    examType: {
      type: String,
      required: [true, 'Please specify the exam type (e.g., A/L, O/L, University)'],
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: [true, 'Please upload the file'],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    mockUploader: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true,
  }
);

const PastPaper = mongoose.model('PastPaper', pastPaperSchema);

module.exports = PastPaper;
