const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP } = require('../utils/twilioService');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', {
      ...req.body,
      password: req.body.password ? '[HIDDEN]' : undefined
    });
    const { name, email, phone, password, otp } = req.body;

    // Validate required fields
    if (!name) {
      console.log('Name is missing');
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email && !phone) {
      console.log('Both email and phone are missing');
      return res.status(400).json({ message: 'Either email or phone is required' });
    }
    if (!password && !otp) {
      console.log('Both password and OTP are missing');
      return res.status(400).json({ message: 'Either password or OTP is required' });
    }

    // Check if user already exists with either email or phone
    console.log('Checking for existing user with:', { email, phone });
    const existingUser = await User.findOne({
      $or: [
        { email: email || undefined },
        { phone: phone || undefined }
      ]
    });

    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ 
        message: 'User already exists with this email or phone number' 
      });
    }

    // Create new user
    console.log('Creating new user with:', { 
      name, 
      email, 
      phone, 
      isOTPLogin: !!otp,
      hasPassword: !!password
    });

    const user = new User({
      name,
      email: email || undefined,
      phone: phone || undefined,
      isOTPLogin: !!otp,
      password: password
    });

    // Log user object before save (without sensitive data)
    console.log('User object before save:', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      isOTPLogin: user.isOTPLogin,
      hasPassword: !!user.password
    });

    if (otp) {
      user.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      };
    }

    // Validate the user model before saving
    console.log('Validating user model');
    const validationError = user.validateSync();
    if (validationError) {
      console.log('Validation error:', validationError);
      return res.status(400).json({ 
        message: 'Invalid user data', 
        errors: Object.values(validationError.errors).map(err => err.message)
      });
    }

    // Save user to database
    console.log('Saving user to database');
    await user.save();
    console.log('User saved successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isOTPLogin: user.isOTPLogin,
      hasPassword: !!user.password
    });

    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated successfully');

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isOTPLogin: user.isOTPLogin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message,
      details: error.stack
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    console.log('Login request received:', {
      ...req.body,
      password: req.body.password ? '[HIDDEN]' : undefined
    });
    const { email, phone, password, otp } = req.body;

    // Validate input
    if (!email && !phone) {
      console.log('Both email and phone are missing');
      return res.status(400).json({ message: 'Please provide either email or phone number' });
    }

    // Find user by email or phone
    console.log('Looking for user with:', { email, phone });
    const user = await User.findOne({
      $or: [
        { email: email || undefined },
        { phone: phone || undefined }
      ]
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isOTPLogin: user.isOTPLogin,
      hasPassword: !!user.password
    });

    // Check login method
    if (user.isOTPLogin) {
      if (!otp) {
        console.log('OTP required but not provided');
        return res.status(400).json({ message: 'OTP is required' });
      }

      // Verify OTP
      const isValidOTP = user.verifyOTP(otp);
      if (!isValidOTP) {
        console.log('Invalid OTP provided');
        return res.status(401).json({ message: 'Invalid OTP' });
      }

      // Clear OTP after successful verification
      user.otp = undefined;
      await user.save();
    } else {
      if (!password) {
        console.log('Password required but not provided');
        return res.status(400).json({ message: 'Password is required' });
      }

      if (!user.password) {
        console.log('User has no password set in database');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      console.log('Attempting password verification for user:', user._id);
      try {
        const isMatch = await user.comparePassword(password);
        console.log('Password verification result:', isMatch);
        
        if (!isMatch) {
          console.log('Password verification failed');
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (err) {
        console.error('Error during password comparison:', err);
        throw err;
      }
    }

    // Generate token
    console.log('Generating token for user:', user._id);
    const token = generateToken(user._id);

    console.log('Login successful for user:', user._id);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isOTPLogin: user.isOTPLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ 
        message: 'Please provide a phone number' 
      });
    }

    // Find or create user
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        phone,
        isOTPLogin: true
      });
    }

    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP via Twilio
    const smsResult = await sendOTP(phone, otp);
    
    if (!smsResult.success) {
      return res.status(500).json({ 
        message: 'Failed to send OTP',
        error: smsResult.error 
      });
    }

    res.json({ 
      message: 'OTP sent successfully',
      isNewUser: !user.name
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to send OTP', 
      error: error.message 
    });
  }
}; 