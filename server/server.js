const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const WebSocket = require('ws');

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.set('debug', true); // Enable mongoose debugging

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  autoIndex: true, // Build indexes
  maxPoolSize: 10 // Maintain up to 10 socket connections
};

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('Connected to MongoDB');

    // Routes
    const authRoutes = require('./routes/auth');
    const usersRoutes = require('./routes/users');
    const subscriptionRequestsRoutes = require('./routes/subscription-requests');

    app.use('/api/auth', authRoutes);
    app.use('/api/users', usersRoutes);
    app.use('/api/subscription-requests', subscriptionRequestsRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
    });

    // Start the server
    const PORT = process.env.PORT || 5002;  // Changed to match frontend configuration
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // WebSocket setup
    const wss = new WebSocket.Server({ 
      server,
      path: '/ws'
    });

    // Store active connections
    const clients = new Set();

    // Handle WebSocket connections
    wss.on('connection', (ws) => {
      console.log('New WebSocket connection');
      clients.add(ws);

      // Handle client messages
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          
          // Handle ping messages
          if (data.type === 'ping') {
            ws.send(JSON.stringify({ type: 'pong' }));
            return;
          }

          // Handle other message types here
          console.log('Received:', data);
          
        } catch (error) {
          console.error('Error processing message:', error);
        }
      });

      // Handle client disconnection
      ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
      });

      // Send welcome message
      ws.send(JSON.stringify({ 
        type: 'connected',
        message: 'Successfully connected to NVCC WebSocket server'
      }));
    });

    // Broadcast to all connected clients
    wss.broadcast = (data) => {
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    };

    // Heartbeat check
    setInterval(() => {
      clients.forEach(ws => {
        if (!ws.isAlive) {
          clients.delete(ws);
          return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

startServer();
