/**
 * index.js
 * 
 * Main Express server entry point for FixMyRoom — Hostel Maintenance & Complaint Tracker.
 * 
 * Responsibilities:
 *  1. Load environment variables via dotenv
 *  2. Initialize Express application
 *  3. Configure built-in middleware (JSON parser, static files)
 *  4. Connect to MongoDB Atlas via Mongoose ODM
 *  5. Mount REST API routes (/api/complaints)
 *  6. Start listening on configured PORT (default: 3000)
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const complaintRoutes = require('./routes/complaint.route');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// =============================================================================
// Middleware
// =============================================================================
// Parse incoming requests with JSON payloads (essential for REST APIs)
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets from the "public" folder (HTML, CSS, client scripts)
app.use(express.static(path.join(__dirname, 'public')));

// =============================================================================
// API Routes
// =============================================================================
app.use('/api/complaints', complaintRoutes);

// Optional health check / API status endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'FixMyRoom API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Fallback for unmatched API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  next();
});

// =============================================================================
// Database Connection & Server Initialization
// =============================================================================
async function startServer() {
  // Validate whether MONGO_URI is set or still using placeholder values
  if (!MONGO_URI || MONGO_URI.includes('<username>') || MONGO_URI.includes('<password>')) {
    console.warn('\n=============================================================');
    console.warn('⚠️  WARNING: MONGO_URI is missing or contains placeholder values.');
    console.warn('   Please update the .env file with your MongoDB Atlas connection string.');
    console.warn('   Format: mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/fixmyroom_db');
    console.warn('=============================================================\n');
  }

  try {
    if (MONGO_URI && !MONGO_URI.includes('<username>')) {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(MONGO_URI);
      console.log('✅ Connected successfully to MongoDB Atlas database!');
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('   Ensure your IP address is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).');
  }

  // Start Express HTTP Server
  app.listen(PORT, () => {
    console.log(`🚀 FixMyRoom Server is running on: http://localhost:${PORT}`);
    console.log(`📁 Serving frontend dashboard from: /public`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api/complaints`);
  });
}

startServer();

module.exports = app; // Export for potential unit testing
