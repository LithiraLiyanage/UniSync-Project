const mongoose = require('mongoose');

// ─── Sub-schema: Assignment ──────────────────────────────────────────────────
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    grade: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

// ─── Sub-schema: Resource ────────────────────────────────────────────────────
const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      enum: ['link', 'pdf', 'video', 'note', 'other'],
      default: 'other',
    },
  },
  { _id: true }
);

// ─── Main Module Schema ──────────────────────────────────────────────────────
const moduleSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,
      maxlength: [150, 'Module name cannot exceed 150 characters'],
    },
    code: {
      type: String,
      required: [true, 'Module code is required'],
      trim: true,
      uppercase: true,
      maxlength: [20, 'Module code cannot exceed 20 characters'],
    },
    lecturer: {
      type: String,
      trim: true,
      default: '',
    },
    progress: {
      type: Number,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot exceed 100'],
      default: 0,
    },
    assignments: [assignmentSchema],
    resources: [resourceSchema],
    // Each module belongs to exactly one user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Index: Fast lookup of modules by user ───────────────────────────────────
moduleSchema.index({ user: 1 });

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;

