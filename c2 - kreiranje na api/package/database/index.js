const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const init = async () =>  {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('succesfully connected to our DATABASE');

  } catch(err) {
    console.log(err);
  }
};

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database Movies...');
  } catch(err) {
    console.log(err);
    return('Fail to connect to database...')
  }
};

module.exports = {
  connectDB,
  init
}