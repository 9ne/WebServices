const User = require ('../pkg/userModel/userSchema');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { promisify } = require ('util');

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password) return res.status(400).send('Please provide correct information');

    const user = await User.findOne({ email });

    if(!user) return res.status(401).send('Invalid email, username or password');

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if(!isPasswordValid) return res.status(400).send('Invalid email, username or password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    res.status(201).json({
      status: 'Success',
      token
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

const signUp = async (req,res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });
    
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true
    });

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        user: newUser
      }
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) return token = req.headers.authorization.split(' ')[1];
  if(!token) return res.status(500).send('You are not logged in!');

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const userTrue = await User.findById(decoded.id);
  if(!userTrue) return res.status(401).send('User doesn\'t exist!');

  next();
};


module.exports = {
  login,
  signUp,
  protect
}