const express = require('express');
const router = express.Router();
const { getGpaByYear, getGpaDistribution, getPassRates } = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/gpa-by-year').get(protect, admin, getGpaByYear);
router.route('/gpa-distribution').get(protect, admin, getGpaDistribution);
router.route('/pass-rates').get(protect, admin, getPassRates);

module.exports = router;
