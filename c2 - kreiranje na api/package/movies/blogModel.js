const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String
  },
  year: {
    type: String
  },
  released: {
    type: String
  },
  genre: {
    type: String
  },
  director: {
    type: String
  },
  plot: {
    type: String
  },
  metascore: {
    type: Number
  },
  imdbRating: {
    type: String
  }

});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;