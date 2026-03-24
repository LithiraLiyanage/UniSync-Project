const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'flagged', 'removed'],
      default: 'pending',
    },
    flagReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
