const mongoose = require('mongoose');

const travelAlertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TravelAlert = mongoose.model('TravelAlert', travelAlertSchema);

module.exports = TravelAlert;
