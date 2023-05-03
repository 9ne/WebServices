const express = require('express');
const morgan = require('morgan');

const database = require('./package/database/index');
const bookHandler = require('./handler/bookHandler');
const auth = require('./handler/authHandler');

const app = express();

database.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// API routes
app.get('/books', bookHandler.getAllBooks);
app.get('/books/:id', bookHandler.getBook);
app.post('/books', bookHandler.createBook);
app.patch('/books/:id', bookHandler.uploadBookImg, bookHandler.updateBook);
app.delete('/books/:id', bookHandler.deleteBook);

// AUTH routes, User/Login/Create Account routes
app.post('/books/login', auth.logIn);
app.post('/books/create-account', auth.signUp);



app.listen(process.env.PORT, err => {
  if(err) return console.log(err);
  console.log('Service Online!');
});