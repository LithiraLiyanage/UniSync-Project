const User = require('../models/User');

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

    const { name, email, university, year, semester, password } = req.body;

    if (name)                user.name       = name;
    if (email)               user.email      = email;
    if (university !== undefined) user.university = university;
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
        year:       updated.year,
        semester:   updated.semester,
        role:       updated.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
