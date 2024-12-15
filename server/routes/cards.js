const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all cards (admin only)
router.get('/admin/cards', auth, admin, async (req, res) => {
  try {
    const cards = await Card.find().populate('assignedTo', 'name email');
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ message: 'Error fetching cards', error: error.message });
  }
});

// Get available cards (admin only)
router.get('/admin/cards/available', auth, admin, async (req, res) => {
  try {
    const cards = await Card.find({ isAssigned: false, status: 'active' });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching available cards:', error);
    res.status(500).json({ message: 'Error fetching available cards', error: error.message });
  }
});

// Get user's assigned cards
router.get('/user/cards', auth, async (req, res) => {
  try {
    const cards = await Card.find({ assignedTo: req.user.id });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching user cards:', error);
    res.status(500).json({ message: 'Error fetching user cards', error: error.message });
  }
});

// Create new card (admin only)
router.post('/admin/cards', auth, admin, async (req, res) => {
  try {
    const {
      number,
      type,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      balance
    } = req.body;

    // Create new card
    const card = new Card({
      number,
      type,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      balance
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(400).json({ message: 'Error creating card', error: error.message });
  }
});

// Update card (admin only)
router.put('/admin/cards/:id', auth, admin, async (req, res) => {
  try {
    const {
      number,
      type,
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      balance,
      status
    } = req.body;

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Update card fields
    if (number) card.number = number;
    if (type) card.type = type;
    if (expiryMonth) card.expiryMonth = expiryMonth;
    if (expiryYear) card.expiryYear = expiryYear;
    if (cvv) card.cvv = cvv;
    if (holderName) card.holderName = holderName;
    if (balance !== undefined) card.balance = balance;
    if (status) card.status = status;

    await card.save();
    res.json(card);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(400).json({ message: 'Error updating card', error: error.message });
  }
});

// Delete card (admin only)
router.delete('/admin/cards/:id', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    if (card.isAssigned) {
      return res.status(400).json({ message: 'Cannot delete assigned card' });
    }

    await card.deleteOne();
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ message: 'Error deleting card', error: error.message });
  }
});

// Assign card to user (used when subscription is purchased)
router.post('/admin/cards/:id/assign/:userId', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    if (card.isAssigned) {
      return res.status(400).json({ message: 'Card is already assigned' });
    }

    await card.assignToUser(req.params.userId);
    res.json(card);
  } catch (error) {
    console.error('Error assigning card:', error);
    res.status(500).json({ message: 'Error assigning card', error: error.message });
  }
});

// Unassign card from user
router.post('/admin/cards/:id/unassign', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    if (!card.isAssigned) {
      return res.status(400).json({ message: 'Card is not assigned' });
    }

    await card.unassignFromUser();
    res.json(card);
  } catch (error) {
    console.error('Error unassigning card:', error);
    res.status(500).json({ message: 'Error unassigning card', error: error.message });
  }
});

module.exports = router;
