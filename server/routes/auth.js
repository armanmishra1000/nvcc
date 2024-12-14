const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose'); // Add mongoose to the requires

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB connection state:', {
        state: mongoose.connection.readyState,
        host: mongoose.connection.host,
        name: mongoose.connection.name
      });
      
      return res.status(503).json({ 
        message: 'Database connection not available',
        details: 'The server is temporarily unable to handle the request due to database connection issues.',
        connectionState: mongoose.connection.readyState
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      stack: error.stack,
      mongoState: mongoose.connection.readyState
    });
    
    res.status(500).json({ 
      message: 'Error creating user', 
      details: error.message,
      connectionState: mongoose.connection.readyState
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
