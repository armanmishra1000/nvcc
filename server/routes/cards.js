const express = require('express')
const router = express.Router()
const Card = require('../models/Card')
const User = require('../models/User')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// Get all cards (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const cards = await Card.find().populate('owner', 'name email')
    res.json(cards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get available cards for users
router.get('/available', auth, async (req, res) => {
  try {
    const cards = await Card.find({ owner: null, status: 'active' })
    res.json(cards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user's cards
router.get('/my-cards', auth, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.user._id })
    res.json(cards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new card (admin only)
router.post('/', auth, admin, async (req, res) => {
  const card = new Card({
    number: req.body.number,
    type: req.body.type,
    expiryMonth: req.body.expiryMonth,
    expiryYear: req.body.expiryYear,
    holderName: req.body.holderName,
    balance: req.body.balance || 0,
    status: 'active'
  })

  try {
    const newCard = await card.save()
    res.status(201).json(newCard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update card (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        card[key] = req.body[key]
      }
    })

    const updatedCard = await card.save()
    res.json(updatedCard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete card (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    await card.remove()
    res.json({ message: 'Card deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Assign card to user (admin only)
router.post('/:id/assign', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    card.owner = req.body.userId
    const updatedCard = await card.save()
    res.json(updatedCard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Request card (user endpoint)
router.post('/:id/request', auth, async (req, res) => {
  try {
    // Check if user has an active subscription
    const user = await User.findById(req.user._id)
    
    // Check if subscription exists and has a plan
    if (!user.subscription || !user.subscription.plan) {
      return res.status(403).json({ message: 'Active subscription required to request cards' })
    }

    // Check if user has remaining cards
    if (user.subscription.cardsRemaining <= 0) {
      return res.status(403).json({ message: 'No card requests remaining in your subscription' })
    }

    const card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    if (card.owner) {
      return res.status(400).json({ message: 'Card is already assigned' })
    }

    // Assign card and decrement remaining cards
    card.owner = user._id
    user.subscription.cardsRemaining -= 1

    await Promise.all([
      card.save(),
      user.save()
    ])

    // Return the updated card with user information
    const updatedCard = await Card.findById(card._id)
      .populate('owner', 'name email')

    res.json(updatedCard)
  } catch (error) {
    console.error('Error requesting card:', error)
    res.status(400).json({ message: error.message || 'Failed to request card' })
  }
})

// Unassign card from user (admin only)
router.post('/:id/unassign', auth, admin, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    card.owner = null
    const updatedCard = await card.save()
    res.json(updatedCard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
