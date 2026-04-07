const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User        = require('../models/User');
const Service     = require('../models/Service');
const Order       = require('../models/Order');
const Report      = require('../models/Report');
const Conversation = require('../models/Conversation');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// ── GET /api/admin/stats ─────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalServices, totalOrders, pendingReports] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Service.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Report.countDocuments({ status: 'pending' }),
    ]);
    res.json({ totalUsers, totalServices, totalOrders, pendingReports });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/admin/reports ───────────────────────────────────────────
router.get('/reports', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;

    // Use lean() to get plain JS objects - avoids virtual field crashes
    const reports = await Report.find(filter)
      .populate('service', 'title category price isActive')
      .populate('reportedBy', 'firstName lastName email')
      .sort('-createdAt')
      .lean();

    // Sanitize - replace any null populated fields with safe defaults
    const safe = reports.map(r => ({
      ...r,
      service: r.service || { title: 'Deleted Service', category: '—' },
      reportedBy: r.reportedBy || { firstName: 'Deleted', lastName: 'User', email: '—' },
    }));

    console.log('[Admin] Returning', safe.length, 'reports');
    res.json(safe);
  } catch (err) {
    console.error('[Admin] GET /reports error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── PUT /api/admin/reports/:id ───────────────────────────────────────
router.put('/reports/:id', async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    ).populate('service', 'title').populate('reportedBy', 'firstName lastName');

    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/admin/services/:id ──────────────────────────────────
router.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.isActive = false;
    await service.save();

    // Mark related reports as resolved
    await Report.updateMany(
      { service: service._id, status: 'pending' },
      { status: 'resolved', adminNote: 'Service removed by admin' }
    );

    res.json({ message: 'Service removed by admin' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/admin/users ─────────────────────────────────────────────
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('firstName lastName email university walletBalance isActive createdAt')
      .sort('-createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── PUT /api/admin/users/:id/suspend ────────────────────────────────
router.put('/users/:id/suspend', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Cannot suspend admin' });

    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: user.isActive ? 'User activated' : 'User suspended', isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/admin/message ──────────────────────────────────────────
// Admin sends a direct message to a service owner
router.post('/message', async (req, res) => {
  try {
    const { recipientId, message, serviceId } = req.body;
    if (!recipientId || !message) return res.status(400).json({ message: 'recipientId and message required' });

    // Find or create conversation
    let convo = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] },
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [req.user._id, recipientId],
        messages: [],
      });
    }

    convo.messages.push({ sender: req.user._id, content: message });
    convo.lastMessage = message.substring(0, 80);
    convo.lastMessageAt = new Date();
    await convo.save();

    res.json({ message: 'Message sent', conversationId: convo._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/admin/services ──────────────────────────────────────────
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find()
      .populate('seller', 'firstName lastName email initials')
      .sort('-createdAt');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
