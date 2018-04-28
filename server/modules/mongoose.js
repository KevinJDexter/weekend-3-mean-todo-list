const mongoose = require('mongoose');

const databaseUrl = 'mongodb://localhost:27017/todo';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
  console.log('mongoose connected to', databaseUrl);
})

mongoose.connection.on('error', (error) => {
  console.log('error connection to database', error);
})

module.exports = mongoose;