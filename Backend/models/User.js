const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const reviewSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: false,
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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never return password in queries by default
    },
    university: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: Number,
      min: [1, 'Year must be at least 1'],
      max: [8, 'Year cannot exceed 8'],
      default: null,
    },
    semester: {
      type: Number,
      min: [1, 'Semester must be at least 1'],
      max: [12, 'Semester cannot exceed 12'],
      default: null,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    recentSearches: {
      type: [String],
      default: [],
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtuals ───────────────────────────────────────────────────────────────
userSchema.virtual('initials').get(function () {
  if (!this.name) return '?';
  const parts = this.name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

userSchema.virtual('avgRating').get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

userSchema.virtual('reviewCount').get(function () {
  return this.reviews ? this.reviews.length : 0;
});

// ─── Pre-save Hook: Hash password before saving ─────────────────────────────
userSchema.pre('save', async function (next) {
  // Only hash if password field was modified (e.g., not on profile updates)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Instance Method: Compare entered password with hashed password ──────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
