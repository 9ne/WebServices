const Book = require('../package/books/bookSchema');
const multer = require('multer');
const uuid = require('uuid');

const imageId = uuid.v4();

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img');
  }, filename: (req, file, callback) => {
    const type = file.mimetype.split('/')[1];
    callback(null, `book-${imageId}-${Date.nov()}.${type}`);
  }
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) 
  return callback(null, true);
  callback(new Error('Type of the file is not supported'), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadBookImg = upload.single('image');

const getAllBooks = async (req, res) => {
  try {
    const Books = await Book.find();
    res.status(200).json({
      status: 'Success',
      data: {
        Books
      }
    });

  } catch(err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        book
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        newBook
      }
    });

  } catch(err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      data: {
        book
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookImg
}