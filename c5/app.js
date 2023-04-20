const express = require('express');
const morgan = require('morgan');
const dataBase = require('./package/database/index');
const carHandler = require('./handlers/carHandler');


const app = express();

dataBase.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/avtomobili',  carHandler.findAllCars);
app.get('/avtomobili/:id', carHandler.getOneCar);

app.post('/avtomobili', carHandler.createCar);
app.patch('/avtomobili/:id', carHandler.uploadCarsPhoto, carHandler.updateCar);
app.delete('/avtomobili/:id', carHandler.deleteCar);



app.listen(process.env.PORT, err => {
  if(err) return console.log(err);
  console.log('Service Online');
});