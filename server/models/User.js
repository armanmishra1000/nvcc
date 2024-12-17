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

const subscriptionHistorySchema = new mongoose.Schema({
  plan: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  cancelledBy: { type: String, enum: ['admin', 'user'], required: true },
  cancelledByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  subscriptionHistory: [subscriptionHistorySchema],
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

// Virtual field for cards
userSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'owner'
});

// Enable virtuals in JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
