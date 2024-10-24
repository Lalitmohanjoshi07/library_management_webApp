const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const auth = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");

// Add a new book
router.post("/addbook", auth, admin, async (req, res) => {
  try {
    const { title, author, category } = req.body;
    const book = new Book({ title, author, category });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book
router.put("/books/:id", auth, admin, async (req, res) => {
  try {
    const { title, author, available, category } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, available, category },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book
router.delete("/books/:id", auth, admin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all books
router.get("/books", auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
