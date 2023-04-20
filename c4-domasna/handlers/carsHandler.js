const Car = require('../package/cars/carsSchema');

const createCar = async (req, res) => {

  try {
    const newCar = await Car.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        car: newCar
      }
    });

  } catch(err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};


const getAllCars = async (req, res) => {

  try {
    const Cars = await Car.find();

    res.status(200).json({
      status: 'success',
      data: {
        Cars
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }
};

const getOneCar = async (req, res) => {

  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        car
      }
    });
    
  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const deleteCar = async (req, res) => {

  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }
};

const updateCar = async (req, res) => {
  
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'Success',
      data: {
        car
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getOneCar,
  deleteCar,
  updateCar
}