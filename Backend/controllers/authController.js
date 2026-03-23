const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Helper: Extract numeric value from strings like "Year 3" or "Semester 1"
 * If already a number, returns it as-is.
 */
const parseNumber = (val) => {
  if (val === undefined || val === null || val === '') return null;
  const num = parseInt(String(val).replace(/\D/g, ''), 10);
  return isNaN(num) ? null : num;
};

// ─── @desc    Register a new user
// ─── @route   POST /api/auth/register
// ─── @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, university, year, semester, role } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('An account with this email already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      university: university || '',
      year: parseNumber(year),
      semester: parseNumber(semester),
      role: role === 'admin' ? 'admin' : 'student',
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        year: user.year,
        semester: user.semester,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Authenticate user and return token
// ─── @route   POST /api/auth/login
// ─── @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        year: user.year,
        semester: user.semester,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get currently authenticated user's profile
// ─── @route   GET /api/auth/me
// ─── @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('modules', 'moduleName code progress');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
