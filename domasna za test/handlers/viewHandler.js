const Player = require('../pkg/sportModel/sportSchema');

const getWebsite = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).render('players', {
      titleOfPage: 'Sport Players',
      players
    });

  } catch(err) {
    res.status(500).send('Error getting website');
  }
};

const getOnePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findById(id);
    res.status(200).render('player', {
      titleOfPage: 'Single Player',
      player
    });

  } catch (err) {
    res.status(500).send('Error getting one player');
    console.log(err);
  }
};

const createNewPlayer = async (req, res) => {
  try {
    await Player.create(req.body);
    res.status(200).redirect('/players');

  } catch(err) {
    res.status(400).send('Cannot create new profile');
    console.log(err);
  }
};

const updatePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    await Player.findByIdAndUpdate(id, req.body);
    res.status(200).redirect('/player');
  } catch(err) {
    res.status(500).send('Cannot update player');
  }
};

const deletePlayer = async (req,res) => {
  try { 
    const id = req.params.id;
    await Player.findByIdAndDelete(id);
    res.status(200).redirect('/players');

  } catch(err) {
    res.status(404).send('Cannot delete car');
  }
};

const login = async (req, res) => {
  try {
    res.status(200).render('players/login', {
      titleOfPage: 'Login'
    });

  } catch(err) {
    res.status(500).send(err);
  }
};


module.exports = {
  getWebsite,
  getOnePlayer,
  createNewPlayer,
  updatePlayer,
  deletePlayer,
  login
}