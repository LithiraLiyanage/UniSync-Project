const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: Protect routes — verifies JWT token.
 * Attaches the authenticated user object to `req.user`.
 * Responds with 401 if token is missing, invalid, or expired.
 */
const protect = async (req, res, next) => {
  let token;

  // Extract Bearer token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — no token provided',
    });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — user no longer exists',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — token is invalid or expired',
    });
  }
};

//const { protect } = require('../middleware/authMiddleware');

/**
 * Middleware: Restrict route to admin users only.
 * Must be used AFTER `protect` middleware.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).json({
    success: false,
    message: 'Access denied — admins only',
  });
};

module.exports = { protect, adminOnly, admin: adminOnly };