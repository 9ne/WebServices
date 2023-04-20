const express = require('express');
const morgan = require('morgan');
const connectToDB = require('./package/database/index');
const handler = require('./handlers/authHandler');
const handlerCars = require('./handlers/carsHandler');

const app = express()

//connect to database
connectToDB.init();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.post('/api/auth/create-account', handler.signUp);
app.post('/api/auth/login', handler.login);

app.get('/cars', handler.protect, handlerCars.getAllCars);
app.get('/cars/:id', handler.protect, handlerCars.getOneCar);
app.post('/cars', handlerCars.createCar);
app.delete('/cars/:id', handlerCars.deleteCar);
app.patch('/cars/:id', handlerCars.updateCar);


app.listen(process.env.PORT, (err) => {
  if(err) return console.log('Could not start service');
  return (console.log('Service started succesfully on port 8000'));
});