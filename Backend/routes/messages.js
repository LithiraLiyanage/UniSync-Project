const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Conversation = require('../models/Conversation');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ── GET /api/messages  – Get user's conversations ─────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const convos = await Conversation.find({
      participants: req.user._id,
    })
      .populate('participants', 'firstName lastName initials')
      .populate('order', 'service status')
      .sort('-lastMessageAt');

    res.json(convos);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/messages/:id  – Single conversation ──────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.id)
      .populate('participants', 'firstName lastName initials email')
      .populate('order', 'service status price')
      .populate('messages.sender', 'firstName lastName initials');

    if (!convo) return res.status(404).json({ message: 'Conversation not found' });

    const isParticipant = convo.participants.some(
      (p) => p._id.toString() === req.user._id.toString()
    );
    if (!isParticipant) return res.status(403).json({ message: 'Not authorized' });

    // Mark messages as read
    convo.messages.forEach((m) => {
      if (m.sender._id.toString() !== req.user._id.toString()) m.isRead = true;
    });
    await convo.save();

    res.json(convo);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/messages  – Create or get conversation ──────────────────
router.post(
  '/',
  protect,
  [body('recipientId').notEmpty().withMessage('Recipient required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    const { recipientId, orderId } = req.body;

    try {
      // Find existing conversation
      let convo = await Conversation.findOne({
        participants: { $all: [req.user._id, recipientId] },
        ...(orderId && { order: orderId }),
      });

      if (!convo) {
        convo = await Conversation.create({
          participants: [req.user._id, recipientId],
          order: orderId || undefined,
          messages: [],
        });
      }

      await convo.populate('participants', 'firstName lastName initials email');
      res.status(201).json(convo);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ── POST /api/messages/:id/send  – Send a message ────────────────────
router.post(
  '/:id/send',
  protect,
  [body('content').trim().notEmpty().withMessage('Message content required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const convo = await Conversation.findById(req.params.id);
      if (!convo) return res.status(404).json({ message: 'Conversation not found' });

      const isParticipant = convo.participants.some(
        (p) => p.toString() === req.user._id.toString()
      );
      if (!isParticipant) return res.status(403).json({ message: 'Not authorized' });

      const message = {
        sender: req.user._id,
        content: req.body.content,
        isRead: false,
      };

      convo.messages.push(message);
      convo.lastMessage = req.body.content.substring(0, 80);
      convo.lastMessageAt = new Date();
      await convo.save();

      await convo.populate('messages.sender', 'firstName lastName initials');
      const newMsg = convo.messages[convo.messages.length - 1];
      res.status(201).json(newMsg);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ── DELETE /api/messages/:convoId/messages/:msgId  – Delete a message ─
router.delete('/:convoId/messages/:msgId', protect, async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.convoId);
    if (!convo) return res.status(404).json({ message: 'Conversation not found' });

    const msg = convo.messages.id(req.params.msgId);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    const isParticipant = convo.participants.some(
      (p) => p.toString() === req.user._id.toString()
    );
    if (!isParticipant) return res.status(403).json({ message: 'Not authorized' });

    convo.messages.pull(req.params.msgId);
    await convo.save();
    res.json({ message: 'Message deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/messages/:id  – Delete conversation ──────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.id);
    if (!convo) return res.status(404).json({ message: 'Conversation not found' });

    const isParticipant = convo.participants.some(
      (p) => p.toString() === req.user._id.toString()
    );
    if (!isParticipant) return res.status(403).json({ message: 'Not authorized' });

    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Conversation deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
