const mongoose = require('mongoose');

const shuttleRouteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    fromLoc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    toLoc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'delayed', 'cancelled'],
      default: 'active',
    },
    nextTime: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ShuttleRoute = mongoose.model('ShuttleRoute', shuttleRouteSchema);

module.exports = ShuttleRoute;
