const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const SubscriptionRequest = require('../models/SubscriptionRequest');

// Log all requests to this router
router.use((req, res, next) => {
  console.log('Subscription Request Route:', {
    method: req.method,
    path: req.path,
    params: req.params,
    body: req.body
  });
  next();
});

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
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  }
});

// Get all subscription requests (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const requests = await SubscriptionRequest.find()
      .populate('user')
      .sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching subscription requests:', error);
    res.status(500).json({ message: 'Error fetching subscription requests' });
  }
});

// Create new subscription request (user)
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating subscription request with data:', {
      userId: req.user?._id,
      plan: req.body?.plan,
      paymentMethod: req.body?.paymentMethod
    });

    // Validate required fields
    if (!req.body.plan || !req.body.paymentMethod) {
      return res.status(400).json({ 
        message: 'Plan and payment method are required' 
      });
    }

    // Check if user already has a pending request
    const existingRequest = await SubscriptionRequest.findOne({
      user: req.user._id,
      status: 'pending'
    });

    if (existingRequest) {
      console.log('User already has a pending request:', existingRequest);
      return res.status(400).json({ 
        message: 'You already have a pending subscription request' 
      });
    }

    // Validate plan type
    if (!['Nvcc Plus', 'Nvcc Pro'].includes(req.body.plan)) {
      return res.status(400).json({ 
        message: 'Invalid plan type. Must be either "Nvcc Plus" or "Nvcc Pro"' 
      });
    }

    const request = new SubscriptionRequest({
      user: req.user._id,
      plan: req.body.plan,
      paymentMethod: req.body.paymentMethod
    });

    console.log('Saving new subscription request:', request);
    await request.save();
    
    console.log('Successfully created subscription request:', request);
    res.status(201).json(request);
  } catch (error) {
    console.error('Detailed error creating subscription request:', {
      error: error.message,
      stack: error.stack,
      user: req.user?._id,
      body: req.body
    });
    
    // Send appropriate error message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Invalid request data',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating subscription request',
      details: error.message 
    });
  }
});

// Approve subscription request (admin only)
router.post('/:id/approve', [auth, admin], async (req, res) => {
  try {
    console.log('Approving subscription request:', req.params.id);
    
    const request = await SubscriptionRequest.findById(req.params.id)
      .populate('user');
    
    if (!request) {
      console.log('Request not found:', req.params.id);
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
      console.log('Request not found:', req.params.id);
      return res.status(404).json({ message: 'Request not found' });
    }
    
    request.status = 'rejected';
    await request.save();
    res.json(request);
  } catch (error) {
    console.error('Error rejecting subscription:', error);
    res.status(500).json({ message: 'Error rejecting subscription request' });
  }
});

// Cancel subscription (admin only)
router.post('/:userId/cancel', [auth, admin], async (req, res) => {
  try {
    console.log('Canceling subscription for user:', req.params.userId);
    
    // Find the user
    const User = mongoose.model('User');
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      console.log('User not found:', req.params.userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.subscription?.plan) {
      console.log('No active subscription for user:', req.params.userId);
      return res.status(400).json({ message: 'User has no active subscription' });
    }

    // Find and update the subscription request status
    const request = await SubscriptionRequest.findOne({ 
      user: user._id,
      status: 'approved'
    });

    if (request) {
      request.status = 'cancelled';
      await request.save();
    }
    
    // Store the cancellation in subscription history
    if (!user.subscriptionHistory) {
      user.subscriptionHistory = [];
    }
    
    user.subscriptionHistory.push({
      plan: user.subscription.plan,
      startDate: user.subscription.startDate,
      endDate: new Date(),
      cancelledBy: 'admin',
      cancelledByUserId: req.user._id
    });
    
    // Clear the subscription
    user.subscription = {
      plan: null,
      startDate: null,
      cardsRemaining: 0,
      lastResetDate: null
    };
    
    // Save the changes
    await user.save();
    
    console.log('Subscription cancelled successfully for user:', req.params.userId);
    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Error cancelling subscription' });
  }
});

// Reactivate subscription (admin only)
router.post('/:requestId/reactivate', [auth, admin], async (req, res) => {
  try {
    const request = await SubscriptionRequest.findById(req.params.requestId)
      .populate('user');
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'cancelled') {
      return res.status(400).json({ message: 'Only cancelled subscriptions can be reactivated' });
    }

    // Update request status
    request.status = 'approved';
    await request.save();

    // Update user's subscription
    const User = mongoose.model('User');
    const subscriptionData = {
      plan: request.plan,
      startDate: new Date(),
      cardsRemaining: request.plan === 'Nvcc Plus' ? 20 : 50,
      lastResetDate: new Date()
    };

    await User.findByIdAndUpdate(
      request.user._id,
      { $set: { subscription: subscriptionData } },
      { new: true }
    );

    res.json({ message: 'Subscription reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    res.status(500).json({ message: 'Error reactivating subscription' });
  }
});

// Get user's subscription request status
router.get('/status', auth, async (req, res) => {
  try {
    const request = await SubscriptionRequest.findOne({ 
      user: req.user._id 
    }).sort({ requestDate: -1 });
    
    if (!request) {
      return res.json({ status: null });
    }

    res.json({ 
      status: request.status,
      plan: request.plan,
      requestDate: request.requestDate
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ message: 'Error fetching subscription status' });
  }
});

// Get user's subscription status
router.get('/subscription-status', auth, async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.subscription?.plan) {
      return res.json({ status: 'inactive' });
    }
    
    res.json({ 
      status: 'active',
      plan: user.subscription.plan,
      startDate: user.subscription.startDate,
      cardsRemaining: user.subscription.cardsRemaining,
      lastResetDate: user.subscription.lastResetDate
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ message: 'Error fetching subscription status' });
  }
});

// Get active subscription for current user
router.get('/active', auth, async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findById(req.user._id).populate('subscription');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the active subscription or null if none exists
    res.json(user.subscription || null);
  } catch (error) {
    console.error('Error fetching active subscription:', error);
    res.status(500).json({ message: 'Error fetching active subscription' });
  }
});

// Get pending subscription requests
router.get('/pending', auth, async (req, res) => {
  try {
    const requests = await SubscriptionRequest.find({
      status: 'pending'
    })
    .populate('user', '-password')
    .sort({ requestDate: -1 });
    
    res.json(requests);
  } catch (error) {
    console.error('Error fetching pending subscription requests:', error);
    res.status(500).json({ message: 'Error fetching pending subscription requests' });
  }
});

module.exports = router;
