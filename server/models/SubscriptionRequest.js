const mongoose = require('mongoose');

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
}, {
  timestamps: true
});

// Add an index to help with querying pending requests for a user
subscriptionRequestSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('SubscriptionRequest', subscriptionRequestSchema);
