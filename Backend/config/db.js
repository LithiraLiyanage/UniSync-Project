const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB Atlas.
 * Exits the process on failure — no point running the server without a DB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are handled automatically in Mongoose 6+, kept for clarity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
