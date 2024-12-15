const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const updateHistorySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  changes: { type: mongoose.Schema.Types.Mixed }
});

const cardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  lastFour: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expiry: { type: String, required: true },
  frozen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  subscriptionPlan: {
    type: String,
    enum: ['Free', 'Basic', 'Premium'],
    default: 'Free'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['Nvcc Plus', 'Nvcc Pro', null],
      default: null
    },
    startDate: {
      type: Date
    },
    cardsRemaining: {
      type: Number,
      default: 0
    },
    lastResetDate: {
      type: Date
    }
  },
  cards: [cardSchema],
  updateHistory: [updateHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password when converting to JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
