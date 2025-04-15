const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const authMiddleware = require('../middleware/authMiddleware');

// Get all alerts for a user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching alerts for user:', req.params.userId);
    const alerts = await Alert.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('loan', 'principalAmount status');
    
    console.log('Found alerts:', alerts.length);
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
});

// Mark an alert as read
router.patch('/:alertId/read', authMiddleware, async (req, res) => {
  try {
    console.log('Marking alert as read:', req.params.alertId);
    const alert = await Alert.findByIdAndUpdate(
      req.params.alertId,
      { read: true },
      { new: true }
    );

    if (!alert) {
      console.log('Alert not found:', req.params.alertId);
      return res.status(404).json({ message: 'Alert not found' });
    }

    console.log('Alert marked as read:', alert._id);
    res.json(alert);
  } catch (error) {
    console.error('Error updating alert:', error);
    res.status(500).json({ message: 'Error updating alert' });
  }
});

// Create a new alert (internal use)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { user, loan, type, message } = req.body;
    console.log('Creating alert:', { user, loan, type, message });
    
    const alert = new Alert({
      user,
      loan,
      type,
      message
    });

    await alert.save();
    console.log('Alert created:', alert._id);
    res.status(201).json(alert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ message: 'Error creating alert' });
  }
});

module.exports = router; 