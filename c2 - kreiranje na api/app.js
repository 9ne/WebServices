const express = require('express');
const dotenv = require('dotenv');
const movieController = require('./controllers/movieController');
const connectToDB = require('./pkg/db/index')
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

dotenv.config({ path: './config.env' });

// console.log(process.env);

connectToDB.init();

// console.log(process.env); // proveruvame dal imame pristap kon config.env

app.get('/api/movies', movieController.getAllMovies);
app.get('/api/movies/:id', movieController.getMovie);
app.post('/api/movies', movieController.createMovie);
app.patch('/api/movie/:id', movieController.updateMovie);
app.delete('/api/movies/:id', movieController.deleteMovie);
app.put('/api/movies/:id', movieController.replaceMovie);


app.listen(process.env.PORT, err => {
  if(err) return console.log(err);
  return (`Movies app started on port 8000`);
});