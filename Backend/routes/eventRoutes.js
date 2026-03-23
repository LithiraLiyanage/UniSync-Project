const express = require('express');
const router = express.Router();
const { getEvents, createEvent, approveEvent, rejectEvent, getEventStats } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getEvents)
  .post(protect, admin, createEvent);

router.route('/stats')
  .get(protect, admin, getEventStats);

router.route('/:id/approve')
  .put(protect, admin, approveEvent);

router.route('/:id/reject')
  .put(protect, admin, rejectEvent);

module.exports = router;
