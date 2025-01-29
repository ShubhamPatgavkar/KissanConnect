const express = require('express');
const { getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to get user details
router.get('/me', authMiddleware, getUserDetails);

module.exports = router;
