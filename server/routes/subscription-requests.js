const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Subscription Request Schema
const subscriptionRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    required: true,
    enum: ['Nvcc Plus', 'Nvcc Pro']
  },
  paymentMethod: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

const SubscriptionRequest = mongoose.model('SubscriptionRequest', subscriptionRequestSchema);

// Get all subscription requests (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const requests = await SubscriptionRequest.find()
      .populate('user', 'name email')
      .sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription requests' });
  }
});

// Create new subscription request (user)
router.post('/', auth, async (req, res) => {
  try {
    const { plan, paymentMethod } = req.body;
    const request = new SubscriptionRequest({
      user: req.user._id,
      plan,
      paymentMethod
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription request' });
  }
});

// Approve subscription request (admin only)
router.post('/:id/approve', [auth, admin], async (req, res) => {
  try {
    console.log('Approving subscription request:', req.params.id);
    
    const request = await SubscriptionRequest.findById(req.params.id)
      .populate('user');
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    console.log('Found subscription request:', request);
    request.status = 'approved';
    await request.save();
    
    // Update user's subscription status
    const User = mongoose.model('User');
    const subscriptionData = {
      plan: request.plan,
      startDate: new Date(),
      cardsRemaining: request.plan === 'Nvcc Plus' ? 20 : 50,
      lastResetDate: new Date()
    };
    console.log('Updating user subscription with:', subscriptionData);
    
    const updatedUser = await User.findByIdAndUpdate(
      request.user._id,
      { $set: { subscription: subscriptionData } },
      { new: true }
    );
    console.log('Updated user:', updatedUser);
    
    res.json(request);
  } catch (error) {
    console.error('Error approving subscription:', error);
    res.status(500).json({ message: 'Error approving subscription request' });
  }
});

// Reject subscription request (admin only)
router.post('/:id/reject', [auth, admin], async (req, res) => {
  try {
    const request = await SubscriptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    request.status = 'rejected';
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting subscription request' });
  }
});

module.exports = router;
