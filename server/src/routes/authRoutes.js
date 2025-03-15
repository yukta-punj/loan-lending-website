const express = require('express');
const router = express.Router();
const { register, login, sendOTP } = require('../controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Send OTP route
router.post('/send-otp', sendOTP);

module.exports = router; 