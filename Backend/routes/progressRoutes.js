const express = require('express');
const router = express.Router();
const { getProgress, updateProgress, getProgressSummary } = require('../controllers/progressController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getProgress);

router.route('/summary')
  .get(protect, getProgressSummary);

router.route('/:moduleId')
  .put(protect, admin, updateProgress);

module.exports = router;
