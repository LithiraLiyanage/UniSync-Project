const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

// Load environment variables FIRST — before any other imports use them
dotenv.config();

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
