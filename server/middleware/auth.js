const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');
    console.log('Auth middleware - Full headers:', req.headers);
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Decoded token:', decoded);
    
    // Get user from database
    const user = await User.findById(decoded.id || decoded._id || decoded.userId);
    console.log('Auth middleware - Found user:', user ? {
      id: user._id,
      email: user.email,
      status: user.status,
      subscription: user.subscription
    } : 'Not found');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware - Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
