const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');

// POST /api/auth/register — Create a new account (student or admin)
router.post('/register', registerUser);

// POST /api/auth/login — Authenticate and receive JWT
router.post('/login', loginUser);

// GET /api/auth/me — Get the current authenticated user's info
router.get('/me', protect, getMe);

// GET /api/auth/admin/users — Admin only: list all registered users
router.get('/admin/users', protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;