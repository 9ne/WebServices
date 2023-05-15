const playerModel = require('../pkg/sportModel/sportSchema');

const allPlayers = async (req, res) => {
  try {
    const allPlayers = await playerModel.find();
    res.status(201).json({
      status: 'Success',
      allPlayers
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const onePlayer = async (req, res) => {
  try {
    const onePLayer = await playerModel.findById(req.params.id);
    res.status(201).json({
      status: 'Success',
      onePLayer
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const createPlayer = async (req, res) => {
  try {
    const newPlayer = await playerModel.create(req.body);
    res.status(201).json({
      status: 'Success',
      newPlayer
    });

  } catch(err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const update = await playerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      update
    });
    
  } catch (err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const deletePlayer = async(req, res) => {
  try {
    await playerModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

module.exports = {
  allPlayers,
  onePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
}