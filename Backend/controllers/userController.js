const User = require('../models/User');
const Order = require('../models/Order');
const mongoose = require('mongoose');

/**
 * Helper: Extract numeric value from strings like "Year 3" or "Semester 1"
 */
const parseNumber = (val) => {
  if (val === undefined || val === null || val === '') return null;
  const num = parseInt(String(val).replace(/\D/g, ''), 10);
  return isNaN(num) ? null : num;
};

// ─── @desc    Get logged-in user's full profile
// ─── @route   GET /api/users/profile
// ─── @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'modules',
      'moduleName code progress lecturer'
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Update logged-in user's profile
// ─── @route   PUT /api/users/profile
// ─── @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const { name, email, university, bio, year, semester, password } = req.body;

    if (name)                user.name       = name;
    if (email)               user.email      = email;
    if (university !== undefined) user.university = university;
    if (bio !== undefined)        user.bio        = bio;
    if (year      !== undefined)  user.year       = parseNumber(year);
    if (semester  !== undefined)  user.semester   = parseNumber(semester);

    if (password) {
      if (password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters');
      }
      user.password = password;
    }

    const updated = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id:        updated._id,
        name:       updated.name,
        email:      updated.email,
        university: updated.university,
        bio:        updated.bio,
        year:       updated.year,
        semester:   updated.semester,
        role:       updated.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Update user password
// ─── @route   PUT /api/users/password
// ─── @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error('Please provide current and new password');
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      res.status(401);
      throw new Error('Incorrect current password');
    }

    if (newPassword.length < 6) {
      res.status(400);
      throw new Error('New password must be at least 6 characters');
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get user stats (seller stats)
// ─── @route   GET /api/users/:id/stats
// ─── @access  Private
const getUserStats = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    const statsAgg = await Order.aggregate([
      { 
        $match: { 
          seller: new mongoose.Types.ObjectId(userId), 
          status: { $ne: 'cancelled' } 
        } 
      },
      { 
        $group: {
          _id: null,
          totalEarned: { $sum: "$price" },
          totalOrders: { $sum: 1 },
          completedOrders: {
            $sum: { $cond: [ { $eq: ["$status", "completed"] }, 1, 0 ] }
          }
        }
      }
    ]);

    const stats = statsAgg.length > 0 ? statsAgg[0] : { totalEarned: 0, totalOrders: 0, completedOrders: 0 };
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile, updatePassword, getUserStats };
