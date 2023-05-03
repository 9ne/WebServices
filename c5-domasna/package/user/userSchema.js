const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 charachers']
  }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;