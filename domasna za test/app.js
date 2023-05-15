const express = require('express');
const morgan = require('morgan');

const DB = require('./pkg/db/index');
const playerHandler = require('./handlers/sportHandler');
const viewHandler = require('./handlers/viewHandler');
const authHandler = require('./handlers/authHandler');


const app = express();

DB.database();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

//ruti za api
app.get('/api/v1/player', playerHandler.allPlayers);
app.get('/api/v1/player/:id', playerHandler.onePlayer);

app.post('/api/v1/player', playerHandler.createPlayer);
app.patch('/api/v1/player/:id', playerHandler.updatePlayer);
app.delete('/api/v1/player/:id', playerHandler.deletePlayer);

//ruti za useri
app.post('/api/v1/auth/create-account', authHandler.signUp);
app.post('/api/v1/auth/login', authHandler.login);


//ruti za veb strana
app.get('/players', viewHandler.getWebsite);
app.get('/players/:id', viewHandler.getOnePlayer);
app.post('/players', viewHandler.createNewPlayer);
app.get('/players/delete/:id', viewHandler.deletePlayer);
app.post('/players/:id', viewHandler.updatePlayer);
app.get('/players/login', viewHandler.login);



app.listen(process.env.PORT, err => {
  if (err) return console.log(err);
  console.log('Servisot e online!');
});