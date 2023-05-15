const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  country: {
    type: String
  },
  typeOfSport: {
    type: String
  },
  height: {
    type: String
  },
  year: {
    type: String
  }
});

const player = mongoose.model('Player', playerSchema);

module.exports = player;