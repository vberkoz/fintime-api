const express = require('express');
const cors = require('cors');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: true
}));

// Routes
app.use('/api/activities', activityRoutes);

module.exports = app;