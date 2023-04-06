const User = require('../package/database/users/userSchema');

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).json({
      status: 'Success',
      data: {
        user: newUser
      }
    });

  } catch(err) {
    return res.status(500).send(err);
  }
};