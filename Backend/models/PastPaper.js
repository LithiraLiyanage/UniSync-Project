const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PastPaper = mongoose.model('PastPaper', pastPaperSchema);

module.exports = PastPaper;
