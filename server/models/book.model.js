const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [3, "Title must be at least 3 characters"]
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minLength: [3, "Author must be at least 3 characters"]
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    minLength: [3, "Genre must be at least 3 characters"]
  },
  notes: {
    type: String
  },
  coverPhoto: {
    type: String
  }
}, { timestamps: true })

// The first parameter below determines collection name
const Book = mongoose.model('book', BookSchema)
module.exports = Book