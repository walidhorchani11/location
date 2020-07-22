const mongoose = require('mongoose');
mongoose.set('debug', 'true');
const connectToDB = (url) => mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('🚀 🚀  connected to mongo');
});

module.exports = connectToDB;
