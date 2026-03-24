const express = require('express');
const router = express.Router();
const { getApprovedListings, createListing, getFlaggedListings, approveListing, deleteListing } = require('../controllers/listingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getApprovedListings)
  .post(protect, createListing);

router.route('/flagged')
  .get(protect, admin, getFlaggedListings);

router.route('/:id/approve')
  .put(protect, admin, approveListing);

router.route('/:id')
  .delete(protect, admin, deleteListing);

module.exports = router;
