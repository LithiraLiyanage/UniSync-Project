const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All user routes are protected — require valid JWT
router.use(protect);

// GET  /api/users/profile — Fetch full user profile with populated modules
router.get('/profile', getUserProfile);

// PUT  /api/users/profile — Update user details (name, university, password, etc.)
router.put('/profile', updateUserProfile);

module.exports = router;
