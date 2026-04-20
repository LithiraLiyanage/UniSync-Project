const express = require('express');
const router = express.Router();
const {
  getPersonalEvents,
  getPersonalEvent,
  createPersonalEvent,
  updatePersonalEvent,
  deletePersonalEvent,
  getPersonalEventStats,
} = require('../controllers/personalEventController');
const { protect } = require('../middleware/authMiddleware');

// Apply protection to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getPersonalEvents)
  .post(createPersonalEvent);

router.route('/stats')
  .get(getPersonalEventStats);

router.route('/:id')
  .get(getPersonalEvent)
  .put(updatePersonalEvent)
  .delete(deletePersonalEvent);

module.exports = router;
