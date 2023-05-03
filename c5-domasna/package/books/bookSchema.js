const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  publishDate: {
    type: Number
  },
  lagnuage: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;