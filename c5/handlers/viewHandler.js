const Car = require('../package/carModel/carSchema');

exports.getWebsite = async (req, res) => {
  try {
    console.log(req.body);

    const cars = await Car.find();
    res.status(200).render('cars', {
      titleOfPage: 'Cars',
      cars
    });

  } catch(err) {
    res.status(500).send('Error getting website');
    console.log(err);
  }
};

exports.getSingleCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    res.status(200).render('car', {
      titleOfPage: 'Read More',
      car
    });

    
  } catch(err) {
    res.status(500).send('Error getting car');
    console.log(err);
  }
};

exports.createNewCar = async (req, res) => {
  try {

    if(req.file) {
      req.body.image = req.file.filename;
    };

    console.log(req.body);
    await Car.create(req.body);
    res.status(200).redirect('/cars');
    
  } catch(err) {
    console.log(err);
    return res.status(400).send('Cannot create new post');
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    await Car.findByIdAndDelete(id);
    res.status(200).redirect('/cars');
  } catch(err) {
    console.log(err);
    res.status(404).send('Cannot delete car');
  }
};

exports.updateCar = async (req, res) => { 
  try {

    if(req.file) {
      req.body.image = req.file.filename;
    };

    const id = req.params.id;
    await Car.findByIdAndUpdate(id, req.body)
    res.status(200).redirect('/cars');
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Cannot update car');
  }
};

