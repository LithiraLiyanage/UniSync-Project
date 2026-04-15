const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Programming',
        'Design',
        'Writing',
        'Tutoring',
        'Music',
        'Business',
        'Other',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 1,
    },
    deliveryDays: {
      type: Number,
      required: true,
      min: 1,
      default: 3,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [{ type: String, trim: true }],
    coverGradient: {
      type: String,
      default: 'linear-gradient(90deg,#5B8DEF,#3A6FD8)',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ─────────────────────────────────────────────────────────
// (Reviews moved to User model)

// ── Indexes ───────────────────────────────────────────────────────────
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Service', serviceSchema);

