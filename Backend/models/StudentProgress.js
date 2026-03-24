const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    marks: {
      type: Number,
      default: null,
    },
    grade: {
      type: String,
      maxlength: 5,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);

module.exports = StudentProgress;
