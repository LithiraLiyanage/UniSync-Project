const express = require('express');
const router = express.Router();
const { getAnnouncements, postAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAnnouncements)
  .post(protect, admin, postAnnouncement);

router.route('/:id')
  .delete(protect, admin, deleteAnnouncement);

module.exports = router;
