const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    buyer: {
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
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

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
    reviews: [reviewSchema],
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
serviceSchema.virtual('avgRating').get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

serviceSchema.virtual('reviewCount').get(function () {
  return this.reviews ? this.reviews.length : 0;
});

// ── Indexes ───────────────────────────────────────────────────────────
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Service', serviceSchema);
