const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      // Handle different message types
      if (data.type === 'profile_update') {
        // Broadcast profile update to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5002;

// Start HTTP and WebSocket server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
