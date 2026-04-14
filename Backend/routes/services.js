const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Order = require('../models/Order');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ── GET /api/services  – Public marketplace listing ──────────────────
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

    const filter = { isActive: true };

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { category: regex },
      ];
    }
    if (category && category !== 'All') filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const allServices = await Service.find(filter).sort('-createdAt').lean({ virtuals: true });

    const User = mongoose.model('User');
    const result = [];

    for (const svc of allServices) {
      try {
        const seller = await User
          .findById(svc.seller)
          .select('name initials university bio createdAt')
          .lean();

        if (!seller) continue;

        let avgRating = 0;
        let reviewCount = 0;
        if (svc.reviews && svc.reviews.length > 0) {
          reviewCount = svc.reviews.length;
          const sum = svc.reviews.reduce((acc, r) => acc + r.rating, 0);
          avgRating = Math.round((sum / reviewCount) * 10) / 10;
        }

        result.push({ ...svc, seller, avgRating, reviewCount });
      } catch (innerErr) {
        console.warn('[Marketplace] Skipping service', svc._id, '-', innerErr.message);
      }
    }

    const start     = (Number(page) - 1) * Number(limit);
    const paginated = result.slice(start, start + Number(limit));

    console.log('[Marketplace] Returning', paginated.length, '/', result.length, 'services');

    res.json({
      services: paginated,
      total:    result.length,
      page:     Number(page),
      pages:    Math.ceil(result.length / Number(limit)),
    });

  } catch (err) {
    console.error('[Marketplace] FATAL:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── GET /api/services/my  – Current user\'s own services ──────────────
router.get('/my', protect, async (req, res) => {
  try {
    const services = await Service.find({ seller: req.user._id }).sort('-createdAt');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/services/recommendations  – AI Service Recommender ──────
router.get('/recommendations', protect, async (req, res) => {
  try {
    let suggestion = null;

    // 1. Dynamic Recommendation Based on Real Services & Recent Searches
    if (req.user && req.user.recentSearches && req.user.recentSearches.length > 0) {
      for (const term of req.user.recentSearches) {
        if (!term || !term.trim()) continue;
        
        const regex = new RegExp(term.trim(), 'i');
        const match = await Service.findOne({
          isActive: true,
          seller: { $ne: req.user._id },
          $or: [
            { title: regex },
            { description: regex },
            { category: regex },
            { tags: regex }
          ]
        }).sort('-createdAt').lean();

        if (match) {
          suggestion = {
            message: `Based on your search for "${term}", check out "${match.title}"!`,
            keyword: term,
            category: match.category
          };
          break;
        }
      }
    }

    // 2. Fallback to Orders and Static Mappings
    if (!suggestion) {
      const orders = await Order.find({ buyer: req.user._id }).populate('service', 'title category tags').sort('-createdAt').limit(5);
      
      const mapping = {
        'Math': { keyword: 'Calculus', category: 'Tutoring', msg: 'Calculus Tutoring' },
        'Code': { keyword: 'React', category: 'Programming', msg: 'Advanced Web Development' },
        'React': { keyword: 'Node', category: 'Programming', msg: 'Backend Development' },
        'Design': { keyword: 'UI/UX', category: 'Design', msg: 'UI/UX Design Review' },
        'Writing': { keyword: 'Essay', category: 'Writing', msg: 'Essay Proofreading' },
        'Java': { keyword: 'Java', category: 'Programming', msg: 'Java Programming Services' },
      };

      if (orders.length > 0 || (req.user && req.user.recentSearches && req.user.recentSearches.length > 0)) {
        let historyText = orders.map(o => o.service ? `${o.service.title} ${o.service.category} ${(o.service.tags || []).join(' ')}` : '').join(' ');
        
        if (req.user && req.user.recentSearches) {
          historyText += ' ' + req.user.recentSearches.join(' ');
        }
        
        for (const [key, result] of Object.entries(mapping)) {
          if (new RegExp(key, 'i').test(historyText)) {
            suggestion = {
              message: `Based on your recent interest in ${key}, you might need ${result.msg}.`,
              keyword: result.keyword,
              category: result.category
            };
            break;
          }
        }
      }
    }

    // 3. Ultimate Fallback
    if (!suggestion) {
      suggestion = {
        message: 'Boost your academic performance this semester with specialized Tutoring!',
        keyword: 'Tutoring',
        category: 'Tutoring'
      };
    }

    res.json(suggestion);
  } catch (err) {
    console.error('[AI Recommender Error]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/services/:id  – Single service detail ───────────────────
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('seller', 'name initials university bio rating totalReviews createdAt')
      .populate('reviews.buyer', 'name initials');

    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Service not found' });
  }
});

// ── POST /api/services  – Create a new service ───────────────────────
router.post(
  '/',
  protect,
  [
    body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 chars'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description min 20 chars'),
    body('category').isIn(['Programming','Design','Writing','Tutoring','Music','Business','Other']).withMessage('Invalid category'),
    body('price').isFloat({ min: 1 }).withMessage('Price must be at least $1'),
    body('deliveryDays').isInt({ min: 1 }).withMessage('Delivery days must be at least 1'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const { title, description, category, price, deliveryDays, tags, coverGradient } = req.body;

      const service = await Service.create({
        title, description, category, price, deliveryDays,
        tags: tags || [],
        coverGradient: coverGradient || 'linear-gradient(90deg,#5B8DEF,#3A6FD8)',
        seller: req.user._id,
        isActive: true,
      });

      await service.populate('seller', 'name initials university bio createdAt');

      // Notify all other users about the new service
      try {
        const allUsers = await User.find({
          _id: { $ne: req.user._id },
          isActive: true,
        }).select('_id');

        if (allUsers.length > 0) {
          const notifications = allUsers.map(u => ({
            recipient: u._id,
            type: 'new_service',
            title: 'New service available',
            body: `${service.seller.name} just added "${service.title}"`,
            link: '/dashboard/marketplace',
            fromUser: req.user._id,
          }));
          await Notification.insertMany(notifications);
        }
      } catch (notifErr) {
        // Don't fail the request if notification fails
        console.warn('[Services] Notification error:', notifErr.message);
      }

      res.status(201).json(service);
    } catch (err) {
      console.error('[Services] Create error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ── PUT /api/services/:id  – Update a service ────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.seller.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const allowed = ['title', 'description', 'category', 'price', 'deliveryDays', 'tags', 'coverGradient', 'isActive'];
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) service[f] = req.body[f];
    });

    await service.save();
    await service.populate('seller', 'name initials university bio createdAt');
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/services/:id  – Permanent delete ────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });

    // Permanently remove from database
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/services/:id/reviews  – Add a review ───────────────────
router.post(
  '/:id/reviews', protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('comment').optional().trim().isLength({ max: 1000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const service = await Service.findById(req.params.id);
      if (!service) return res.status(404).json({ message: 'Service not found' });

      const alreadyIndex = service.reviews.findIndex((r) => r.buyer.toString() === req.user._id.toString());
      if (alreadyIndex !== -1) {
        service.reviews[alreadyIndex].rating = req.body.rating;
        service.reviews[alreadyIndex].comment = req.body.comment;
      } else {
        service.reviews.push({ buyer: req.user._id, rating: req.body.rating, comment: req.body.comment });
      }
      
      await service.save();
      res.status(201).json({ message: 'Review added', avgRating: service.avgRating, reviewCount: service.reviewCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ── DELETE /api/services/:id/reviews/:reviewId  – Remove a review ────
router.delete('/:id/reviews/:reviewId', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const review = service.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.buyer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    service.reviews.pull(req.params.reviewId);
    await service.save();
    res.json({ message: 'Review removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
