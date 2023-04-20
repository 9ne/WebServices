const carModel = require('../package/carModel/carSchema');
const multer = require('multer');
const uuid = require('uuid');

// generiranje unikaten id
const imageId = uuid.v4();

// const upload = multer({ dest: 'public/sliki/avtomobili' });

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/sliki/avtomobili')
  }, filename: (req, file, callback) => {
    // kola-unikaten-id-vreme.png -- vakvo imenuvanje ke ni garantira da nema povekje sliki so isto ime
    const type = file.mimetype.split('/')[1];
    callback(null, `avtomobil-${imageId}-${Date.now()}.${type}`);
  }
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(new Error('Fajlot ne e suportiran'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadCarsPhoto = upload.single('sliki');

exports.updateCar = async (req, res) => {

  try {
    console.log(req.file);
    console.log(req.body);

    if(req.file) {
      req.body.image = req.file.filename;
    };

    console.log(req.body.image);

    // input da ima type file

    const cars = await carModel.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      cars
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

exports.createCar = async (req, res) => {
  try {
    const newCar = await carModel.create(req.body);
    res.status(201).json({
      status: 'Success',
      newCar
    });
    
  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

exports.findAllCars = async(req, res) => {
  try {
    const allCars = await carModel.find();
    res.status(201).json({
      status: 'Success',
      allCars
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

exports.getOneCar = async (req, res) => {
  try {
    const getOneCar = await carModel.findById(req.params.id);
    res.status(201).json({
      status: 'Success',
      getOneCar
    });
  } catch {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await carModel.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
}