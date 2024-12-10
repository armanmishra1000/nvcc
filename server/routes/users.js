const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
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
    const user = await User.findById(req.user.userId);

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
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    console.log('GET /api/users request received');
    console.log('User from token:', req.user);
    
    // Check if user is admin
    if (!req.user.isAdmin) {
      console.log('Access denied: User is not admin');
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const users = await User.find().select('-password');
    console.log('Users found:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Server error in GET /api/users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (admin only)
router.put('/:userId', auth, async (req, res) => {
  try {
    console.log('PUT /api/users/:userId request received');
    console.log('User from token:', req.user);
    console.log('Update data:', req.body);
    
    // Check if user is admin
    if (!req.user.isAdmin) {
      console.log('Access denied: User is not admin');
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { name, email, status, subscriptionPlan } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (status) user.status = status;
    if (subscriptionPlan) user.subscriptionPlan = subscriptionPlan;

    // Save update history
    user.updateHistory.push({
      timestamp: new Date(),
      changes: req.body
    });

    await user.save();
    console.log('User updated successfully');
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user status (admin only)
router.patch('/:userId/status', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

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
router.delete('/:userId', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

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
