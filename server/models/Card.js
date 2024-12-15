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
    enum: ['visa', 'mastercard', 'amex']
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
  cvv: {
    type: String,
    required: true,
    match: /^\d{3,4}$/
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
  isAssigned: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
cardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to assign card to a user
cardSchema.methods.assignToUser = async function(userId) {
  this.isAssigned = true;
  this.assignedTo = userId;
  this.assignedAt = Date.now();
  await this.save();
};

// Method to unassign card from user
cardSchema.methods.unassignFromUser = async function() {
  this.isAssigned = false;
  this.assignedTo = null;
  this.assignedAt = null;
  await this.save();
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
