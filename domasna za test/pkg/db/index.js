const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../../config.env`});


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
  ).replace(
    'NAME',
    'Sport'
  );

  const database = async () => {
    try {
      await mongoose.connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log('Konektirani vo baza na podatoci!');
    } catch(err) {
      console.log(err);
    }
  };

  module.exports = {
    database
  }