const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// View fines for a user
router.get('/fines/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId, fine: { $gt: 0 } });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay fine (just for demonstration)
router.post('/pay-fine', async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId);

    if (transaction.fine === 0) {
      return res.status(400).json({ message: 'No fine to pay' });
    }

    // Mark fine as paid
    transaction.fine = 0;
    await transaction.save();

    res.status(200).json({ message: 'Fine paid successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
