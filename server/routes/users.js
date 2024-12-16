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

// Get current user with populated data
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate({
        path: 'cards',
        select: '-__v'
      });
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format the response
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      subscription: user.subscription,
      cards: user.cards || [],
      isAdmin: user.isAdmin
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
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

// Get user's subscription
router.get('/subscription', auth, async (req, res) => {
  try {
    console.log('Getting subscription for user:', req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Found user subscription:', user.subscription);
    res.json(user.subscription);
  } catch (error) {
    console.error('Error getting subscription:', error);
    res.status(500).json({ message: 'Error getting subscription' });
  }
});

// Get user's cards
router.get('/cards', auth, async (req, res) => {
  try {
    console.log('Getting cards for user:', req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Found user cards:', user.cards || []);
    res.json(user.cards || []);
  } catch (error) {
    console.error('Error getting cards:', error);
    res.status(500).json({ message: 'Error getting cards' });
  }
});

// Create new card
router.post('/cards', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user?.subscription?.plan) {
      return res.status(403).json({ message: 'No active subscription found' });
    }

    if (user.subscription.cardsRemaining <= 0) {
      return res.status(403).json({ message: 'No cards remaining in your plan' });
    }

    // Create new card
    const newCard = {
      id: Date.now().toString(),
      type: req.body.type || 'Virtual Card',
      lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
      cardHolder: req.body.name,
      expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
      frozen: false,
      createdAt: new Date()
    };

    // Add card to user's cards array
    if (!user.cards) {
      user.cards = [];
    }
    user.cards.push(newCard);

    // Decrease remaining cards count
    user.subscription.cardsRemaining--;
    
    // Save the changes
    await user.save();

    console.log('Created new card:', newCard);
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: 'Error creating card' });
  }
});

// Terminate card
router.delete('/cards/:cardId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cardIndex = user.cards.findIndex(card => card.id === req.params.cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Remove the card
    user.cards.splice(cardIndex, 1);
    await user.save();

    console.log(`Card ${req.params.cardId} terminated for user ${user._id}`);
    res.json({ message: 'Card terminated successfully' });
  } catch (error) {
    console.error('Error terminating card:', error);
    res.status(500).json({ message: 'Error terminating card' });
  }
});

// Toggle card freeze status
router.post('/cards/:cardId/toggle-freeze', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const card = user.cards.find(card => card.id === req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Toggle frozen status
    card.frozen = !card.frozen;
    await user.save();

    console.log(`Card ${req.params.cardId} freeze status toggled to ${card.frozen}`);
    res.json({ frozen: card.frozen });
  } catch (error) {
    console.error('Error toggling card freeze status:', error);
    res.status(500).json({ message: 'Error toggling card freeze status' });
  }
});

// Reset monthly card count (This would typically be done by a cron job)
router.post('/reset-card-count', [auth, admin], async (req, res) => {
  try {
    const users = await User.find({ 'subscription.plan': { $ne: null } });
    
    for (const user of users) {
      const cardsPerMonth = user.subscription.plan === 'Nvcc Plus' ? 20 : 50;
      user.subscription.cardsRemaining = cardsPerMonth;
      user.subscription.lastResetDate = new Date();
      await user.save();
    }

    res.json({ message: 'Card counts reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting card counts' });
  }
});

module.exports = router;
