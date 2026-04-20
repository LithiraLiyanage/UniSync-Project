const mongoose = require('mongoose');

const personalEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function(endDate) {
          return endDate > this.startDate;
        },
        message: 'End date must be after start date'
      }
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['personal', 'academic', 'social', 'work', 'health', 'other'],
      default: 'personal',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    color: {
      type: String,
      default: '#4F46E5',
      validate: {
        validator: function(color) {
          return /^#[0-9A-F]{6}$/i.test(color);
        },
        message: 'Color must be a valid hex color code'
      }
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    reminderMinutes: {
      type: Number,
      default: 15,
      min: [0, 'Reminder minutes cannot be negative'],
      max: [1440, 'Reminder cannot exceed 24 hours (1440 minutes)'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [50, 'Tag cannot exceed 50 characters'],
    }],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
personalEventSchema.index({ user: 1, startDate: 1 });
personalEventSchema.index({ user: 1, category: 1 });

const PersonalEvent = mongoose.model('PersonalEvent', personalEventSchema);

module.exports = PersonalEvent;
