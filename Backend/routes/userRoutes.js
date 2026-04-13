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

// POST /api/users/searches — Track a search query for AI Recommender
router.post('/searches', async (req, res) => {
  try {
    const { query } = req.body;
    if (query && typeof query === 'string' && query.trim()) {
      req.user.recentSearches.unshift(query.trim());
      // keep only last 5 searches
      if (req.user.recentSearches.length > 5) {
        req.user.recentSearches = req.user.recentSearches.slice(0, 5);
      }
      await req.user.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
