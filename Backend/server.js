// Load environment variables FIRST — before any other imports use them
const path = require('path');

// Set environment variables as fallback
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unisync';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_development';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 5000;

require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// ─── Start Server ────────────────────────────────────────────────────────────
const startServer = async () => {
  // Connect to MongoDB before accepting requests
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 UniSync API running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health\n`);
  });
};

// ─── Handle Unhandled Rejections ─────────────────────────────────────────────
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

startServer();
