const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'pdf'
    },
    size: {
      type: String,
      default: '2.4 MB'
    },
    filePath: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Paper', paperSchema);
