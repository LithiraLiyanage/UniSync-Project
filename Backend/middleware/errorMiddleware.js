/**
 * Middleware: 404 Not Found handler.
 * Catches any request that didn't match a route.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware: Global error handler.
 * Centralizes all error responses in a consistent JSON format.
 * Must be registered LAST in Express middleware chain.
 *
 * @param {Error} err - Error object (may include statusCode)
 */
const errorHandler = (err, req, res, next) => {
  // Some errors arrive with a 200 status — default those to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ── Mongoose: Bad ObjectId ──────────────────────────────────────────────────
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found — invalid ID format';
  }

  // ── Mongoose: Duplicate key (e.g., duplicate email) ────────────────────────
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // ── Mongoose: Validation errors ────────────────────────────────────────────
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
