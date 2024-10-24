const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const auth = require("../middlewares/auth");
const User = require("../models/User");

// Issue a book
router.post("/issue-book", auth, async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book.available) {
      return res.status(400).json({ message: "Book is not available" });
    }
    
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message: "User deesn't exist"});
    }

    const transaction = new Transaction({ user: userId, book: bookId });
    await transaction.save();

    // Mark book as unavailable
    book.available = false;
    await book.save();

    //update book name and user name
    console.log(book.title, user.name);
    const result = {};
    result.book = book.title;
    result.user = user.name;
    result.transationId = transaction.id;
    res.status(201).json({ message: "Book issued successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Return a book
router.post("/return-book", auth, async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId).populate(
      "book"
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Calculate fine (if any)
    const daysLate =
      Math.floor((Date.now() - transaction.issueDate) / (1000 * 60 * 60 * 24)) -
      14; // Assuming 14-day limit
    transaction.fine = daysLate > 0 ? daysLate * 1 : 0; // Fine: 1 rupee per day late

    // Set return date and save transaction
    transaction.returnDate = Date.now();
    await transaction.save();

    // Mark book as available
    transaction.book.available = true;
    await transaction.book.save();

    res
      .status(200)
      .json({ message: "Book returned successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
