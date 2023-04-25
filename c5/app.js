const express = require('express');
const morgan = require('morgan');
const dataBase = require('./package/database/index');
const carHandler = require('./handlers/carHandler');
const viewHandler = require('./handlers/viewHandler');


const app = express();

dataBase.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/avtomobili',  carHandler.findAllCars);
app.get('/avtomobili/:id', carHandler.getOneCar);

app.post('/avtomobili', carHandler.createCar);
app.patch('/avtomobili/:id', carHandler.uploadCarsPhoto, carHandler.updateCar);
app.delete('/avtomobili/:id', carHandler.deleteCar);


// ruti za veb strana
app.get('/cars', viewHandler.getWebsite);
app.get('/cars/:id', viewHandler.getSingleCar);
app.post('/cars', carHandler.uploadCarsPhoto, viewHandler.createNewCar);
app.get('/cars/:id', viewHandler.getSingleCar);
app.get('/delete/:id', viewHandler.deleteCar);
app.post('/cars/:id', carHandler.uploadCarsPhoto, viewHandler.updateCar);


app.listen(process.env.PORT, err => {
  if(err) return console.log(err);
  console.log('Service Online');
});