const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Track changes
    const changes = {};
    if (username && username !== user.name) {
      changes.name = { from: user.name, to: username };
      user.name = username;
    }
    if (firstName && firstName !== user.firstName) {
      changes.firstName = { from: user.firstName, to: firstName };
      user.firstName = firstName;
    }
    if (lastName && lastName !== user.lastName) {
      changes.lastName = { from: user.lastName, to: lastName };
      user.lastName = lastName;
    }

    // Only add to update history if there were changes
    if (Object.keys(changes).length > 0) {
      user.updateHistory.push({
        timestamp: new Date(),
        changes
      });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

// Admin Routes
// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking admin status' });
  }
};

// Get all users (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    console.log('GET /api/users - Fetching all users');
    const users = await User.find().select('-password -updateHistory');
    console.log('Found users:', users.length);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Update user (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { name, email, status, subscriptionPlan } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Track changes
    const changes = {};
    if (name && name !== user.name) {
      changes.name = { from: user.name, to: name };
      user.name = name;
    }
    if (email && email !== user.email) {
      changes.email = { from: user.email, to: email };
      user.email = email;
    }
    if (status && status !== user.status) {
      changes.status = { from: user.status, to: status };
      user.status = status;
    }
    if (subscriptionPlan && subscriptionPlan !== user.subscriptionPlan) {
      changes.subscriptionPlan = { from: user.subscriptionPlan, to: subscriptionPlan };
      user.subscriptionPlan = subscriptionPlan;
    }

    // Only add to update history if there were changes
    if (Object.keys(changes).length > 0) {
      user.updateHistory.push({
        timestamp: new Date(),
        changes
      });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Update user status (admin only)
router.patch('/:userId/status', [auth, admin], async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/:userId', [auth, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
