const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// ─── Core Middleware ─────────────────────────────────────────────────────────

// Enable CORS — allows requests from any localhost port in development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 UniSync API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/modules', moduleRoutes);

const paperRoutes = require('./routes/paperRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const listingRoutes = require('./routes/listingRoutes');
const travelRoutes = require('./routes/travelRoutes');
const eventRoutes = require('./routes/eventRoutes');
const progressRoutes = require('./routes/progressRoutes');
const reportRoutes = require('./routes/reportRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

app.use('/api/papers', paperRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api', travelRoutes); // Note: handles /api/routes and /api/alerts
app.use('/api/events', eventRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);

app.use('/uploads', express.static('uploads'));


// ─── Error Handling Middleware ───────────────────────────────────────────────
// Must be registered AFTER all routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
