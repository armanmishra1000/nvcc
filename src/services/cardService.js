// Mock data
const mockCards = [
  {
    id: 1,
    type: 'Credit Card',
    bank: 'Universal Bank',
    network: 'visa',
    lastFour: '4567',
    cardHolder: 'JOHN DOE',
    expiry: '12/25',
    frozen: false,
    design: 'bg-gradient-to-r from-purple-500 to-pink-500',
    transactions: [
      {
        id: 1,
        merchant: 'Amazon',
        amount: '299.99',
        type: 'debit',
        date: '2024-12-09'
      },
      {
        id: 2,
        merchant: 'Refund - Nike',
        amount: '89.99',
        type: 'credit',
        date: '2024-12-08'
      }
    ]
  },
  {
    id: 2,
    type: 'Debit Card',
    bank: 'City Bank',
    network: 'mastercard',
    lastFour: '8901',
    cardHolder: 'JOHN DOE',
    expiry: '09/26',
    frozen: true,
    design: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    transactions: [
      {
        id: 1,
        merchant: 'Starbucks',
        amount: '5.99',
        type: 'debit',
        date: '2024-12-09'
      },
      {
        id: 2,
        merchant: 'Target',
        amount: '156.78',
        type: 'debit',
        date: '2024-12-07'
      }
    ]
  }
]

export const cardService = {
  // Get all cards for the current user
  async getAllCards() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [...mockCards]
  },

  // Add a new card
  async addCard(cardData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newCard = {
      id: mockCards.length + 1,
      type: 'Credit Card',
      bank: 'Universal Bank',
      network: 'visa',
      lastFour: cardData.number.slice(-4),
      cardHolder: cardData.cardHolder,
      expiry: cardData.expiry,
      frozen: false,
      design: 'bg-gradient-to-r from-green-500 to-teal-500',
      transactions: []
    }
    
    mockCards.push(newCard)
    return newCard
  },

  // Update card status (freeze/unfreeze)
  async updateCardStatus(cardId, status) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const card = mockCards.find(c => c.id === cardId)
    if (card) {
      card.frozen = status
    }
    return card
  },

  // Get card transactions
  async getCardTransactions(cardId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const card = mockCards.find(c => c.id === cardId)
    return card ? card.transactions : []
  },

  // Delete a card
  async deleteCard(cardId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const index = mockCards.findIndex(c => c.id === cardId)
    if (index !== -1) {
      mockCards.splice(index, 1)
    }
    return { success: true }
  }
}

export default cardService
