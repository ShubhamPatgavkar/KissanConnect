const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const cropRoutes = require('./Routes/cropRoutes');
const connectDB = require('./config/db');
require('dotenv').config({ path: './key.env' });
const path = require('path');


// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/users', userRoutes); // Routes for user-related operations
app.use('/api/crops', cropRoutes); // Routes for crop-related operations
app.use('/uploads', express.static(path.join(__dirname, './uploads'))); // Serve uploaded images
// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
