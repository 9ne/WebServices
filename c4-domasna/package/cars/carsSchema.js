const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'The car must have a brand name']
  },
  type: {
    type: String,
    required: [true, 'The car must have a type']
  },
  color: {
    type: String,
    required: [true, 'The car must have a color']
  },
  fuelType: {
    type: String,
    required: [true, 'The car must have a fuel type']
  },
  year: {
    type: String,
    required: [true, 'The car must have a year of production']
  },
  engine: {
    type: String,
    required: [true, 'The car must have a type of engine']
  },
  transmission: {
    type: String,
    required: [true, 'The car must have a type of transmission']
  },
  mileage: {
    type: String,
    required: [true, 'The car must have a mileage assigned']
  }
});

const Car = mongoose.model('Car', carsSchema);

module.exports = Car;