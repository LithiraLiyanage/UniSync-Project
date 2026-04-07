const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Report = require('../models/Report');
const { protect } = require('../middleware/auth');

// ── POST /api/reports  – Student submits a report ────────────────────
router.post(
  '/',
  protect,
  [
    body('serviceId').notEmpty().withMessage('Service ID required'),
    body('reason').isIn(['Spam','Inappropriate content','Fake service','Scam','Other']).withMessage('Invalid reason'),
    body('details').optional().trim().isLength({ max: 1000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    const { serviceId, reason, details } = req.body;

    try {
      // Prevent duplicate reports from same user for same service
      const existing = await Report.findOne({ service: serviceId, reportedBy: req.user._id });
      if (existing)
        return res.status(400).json({ message: 'You have already reported this service' });

      const report = await Report.create({
        service:    serviceId,
        reportedBy: req.user._id,
        reason,
        details,
      });

      res.status(201).json({ message: 'Report submitted. Our admin will review it shortly.', report });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
