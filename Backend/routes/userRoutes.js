const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All user routes are protected — require valid JWT
router.use(protect);

// GET  /api/users/profile — Fetch full user profile with populated modules
router.get('/profile', getUserProfile);

// PUT  /api/users/profile — Update user details (name, university, bio, etc.)
router.put('/profile', updateUserProfile);

// PUT  /api/users/password — Update user password
router.put('/password', updatePassword);

module.exports = router;
