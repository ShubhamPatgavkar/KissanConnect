const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: './key.env' });

// Import Routes
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const cropRoutes = require('./Routes/cropRoutes');
const emailRoutes = require('./Routes/email.js');
const connectDB = require('./config/db');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // JSON Parsing

// Serve Uploaded Images
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
