const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Virtual Card', 'Physical Card']
  },
  expiryMonth: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])$/
  },
  expiryYear: {
    type: String,
    required: true,
    match: /^\d{4}$/
  },
  holderName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active'
  },
  frozen: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

// Update lastModified on save
cardSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// Method to assign card to a user
cardSchema.methods.assignToUser = async function(userId) {
  if (this.owner) {
    throw new Error('Card is already assigned to a user');
  }
  
  this.owner = userId;
  this.status = 'active';
  await this.save();
  return this;
};

// Method to unassign card from user
cardSchema.methods.unassignFromUser = async function() {
  if (!this.owner) {
    throw new Error('Card is not assigned to any user');
  }
  
  this.owner = null;
  await this.save();
  return this;
};

// Virtual for last 4 digits
cardSchema.virtual('lastFour').get(function() {
  return this.number.slice(-4);
});

// Configure toJSON
cardSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.cvv;
    // Only show last 4 digits of card number
    ret.number = '*'.repeat(12) + ret.number.slice(-4);
    return ret;
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
