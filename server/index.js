
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bookfinder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Updated schema with publishedDate
const Book = mongoose.model("Book", {
  title: String,
  author: String,
  thumbnail: String,
  publishedDate: String, // <-- IMPORTANT LINE
});

// ✅ Save book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send("Error saving book");
  }
});

// ✅ Get all saved books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
});

// ✅ Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
