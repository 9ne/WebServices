const express = require('express');
const morgan = require('morgan');
const authHandler = require('./handlers/authHandler');
const connectDataBase = require('./package/database/index');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// data baza
connectDataBase.init();

// ruti
app.post('/api/v1/auth/create-account', authHandler.signUp);
app.post('/api/v1/auth/login');

app.listen(process.env.PORT, (err) => {
  if(err) return console.log('Could not start service');
  console.log(`Service started succesfully on port ${process.env.PORT}`);
});