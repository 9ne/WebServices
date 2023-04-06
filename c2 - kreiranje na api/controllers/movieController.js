const Movie = require('../pkg/movies/blogModel');

const createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        movie: newMovie
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed to create',
      message: err
    });
  }
};

const getMovie = async(req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    Blog.findOne({_id: req.params.id});

    res.status(200).json({
      status: 'Success',
      data: {
        movie
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'Failed to delete a movie',
      message: err
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json( {
      status: 'Success',
      data: {
        movies
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'Success',
      data: {
        movie
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Failed',
      message: err
    });
  }
};


const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null
    });

  } catch(err) {
    res.status(404).json({
      status: 'Failed',
      message: err
    });
  }
}; 

const replaceMovie = async (req, res) =>  {
  try {
    const movie = await Movie.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'Success',
      data: {
        movie
      }
    });

  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err
    });
  }
};



module.exports = {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  replaceMovie
}