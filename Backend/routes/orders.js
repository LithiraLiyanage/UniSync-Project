const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Setup multer for slip uploads
const uploadDir = path.join(__dirname, '../uploads/slips');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// ── GET /api/orders  – Get user's orders (buyer + seller) ────────────
router.get('/', protect, async (req, res) => {
  try {
    const { role = 'buyer', status, page = 1, limit = 10 } = req.query;
    const filter = role === 'seller' ? { seller: req.user._id } : { buyer: req.user._id };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('service', 'title category price coverGradient')
      .populate('buyer', 'firstName lastName initials')
      .populate('seller', 'firstName lastName initials')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    res.json({ orders, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    console.error('[GET /api/orders Error]:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── GET /api/orders/:id  – Single order ──────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('service', 'title description category price deliveryDays coverGradient')
      .populate('buyer', 'firstName lastName email initials')
      .populate('seller', 'firstName lastName email initials university');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const isParticipant =
      order.buyer._id.toString() === req.user._id.toString() ||
      order.seller._id.toString() === req.user._id.toString();
    if (!isParticipant) return res.status(403).json({ message: 'Not authorized' });

    res.json(order);
  } catch (err) {
    console.error('[GET Order By ID Error]:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── POST /api/orders  – Place order ──────────────────────────────────
router.post(
  '/',
  protect,
  upload.single('slip'),
  async (req, res) => {
    const { serviceId, requirements } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: 'Service ID required' });
    }
    if (requirements && requirements.length > 2000) {
      return res.status(400).json({ message: 'Requirements too long' });
    }

    try {
      const service = await Service.findById(serviceId).populate('seller');
      if (!service || !service.isActive)
        return res.status(404).json({ message: 'Service not found or inactive' });

      if (service.seller._id.toString() === req.user._id.toString())
        return res.status(400).json({ message: 'You cannot order your own service' });

      if (!req.file) {
        return res.status(400).json({ message: 'Payment slip is required' });
      }

      const slipUrl = `/uploads/slips/${req.file.filename}`;

      const order = await Order.create({
        service: service._id,
        buyer: req.user._id,
        seller: service.seller._id,
        price: service.price,
        requirements,
        status: 'pending',
        slipUrl,
        slipUploadedAt: new Date()
      });

      // Increment service order count
      service.totalOrders += 1;
      await service.save();

      await order.populate([
        { path: 'service', select: 'title category price' },
        { path: 'buyer', select: 'firstName lastName initials' },
        { path: 'seller', select: 'firstName lastName initials' },
      ]);

      // Notify seller
      try {
        await Notification.create({
          recipient: order.seller._id,
          type: 'new_order',
          title: 'New Order Received',
          body: `${order.buyer.firstName} placed an order for "${order.service.title}"`,
          link: '/dashboard/orders',
          fromUser: order.buyer._id,
        });
      } catch (err) {
        console.warn('[Orders] Notification error:', err.message);
      }

      res.status(201).json(order);
    } catch (err) {
      console.error('[POST Order Error]', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

// ── PUT /api/orders/:id/status  – Update order status ────────────────
router.put('/:id/status', protect, async (req, res) => {
  const { status, deliveryNote, cancellationReason } = req.body;

  const validTransitions = {
    seller: {
      pending: ['in_progress', 'cancelled'],
      in_progress: ['delivered', 'cancelled'],
    },
    buyer: {
      delivered: ['completed', 'in_progress'], // in_progress = request revision
      pending: ['cancelled'],
    },
  };

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const isSeller = order.seller.toString() === req.user._id.toString();
    const isBuyer = order.buyer.toString() === req.user._id.toString();
    if (!isSeller && !isBuyer)
      return res.status(403).json({ message: 'Not authorized' });

    const role = isSeller ? 'seller' : 'buyer';
    const allowed = validTransitions[role][order.status] || [];
    if (!allowed.includes(status))
      return res.status(400).json({
        message: `Cannot transition from '${order.status}' to '${status}'`,
      });

    order.status = status;
    if (deliveryNote) order.deliveryNote = deliveryNote;
    if (cancellationReason) order.cancellationReason = cancellationReason;

    // If completed, credit seller
    if (status === 'completed') {
      await User.findByIdAndUpdate(order.seller, {
        $inc: { walletBalance: order.price },
      });
    }

    // If cancelled by either party and was pending, refund buyer
    if (status === 'cancelled' && order.status === 'pending') {
      await User.findByIdAndUpdate(order.buyer, {
        $inc: { walletBalance: order.price },
      });
    }

    await order.save();
    await order.populate('service', 'title');

    // Notify the other party
    try {
      const recipientId = isSeller ? order.buyer : order.seller;
      const statusLabel = {
        in_progress: 'In Progress',
        delivered: 'Delivered',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }[status];

      if (statusLabel) {
        await Notification.create({
          recipient: recipientId,
          type: 'order_update',
          title: 'Order Updated',
          body: `Order for "${order.service.title}" marked as ${statusLabel}`,
          link: '/dashboard/orders',
          fromUser: req.user._id,
        });
      }
    } catch (notifErr) {
      console.warn('[Orders] Notification error:', notifErr.message);
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/orders/:id  – Cancel order (buyer, pending only) ─────
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.buyer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    if (order.status !== 'pending')
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });

    order.status = 'cancelled';
    order.cancellationReason = 'Cancelled by buyer';
    await order.save();

    // Refund buyer
    await User.findByIdAndUpdate(order.buyer, {
      $inc: { walletBalance: order.price },
    });

    res.json({ message: 'Order cancelled and refund processed' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
