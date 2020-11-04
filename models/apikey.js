const mongoose = require('mongoose');

const apikeySchema = new mongoose.Schema({
  username: {
      type: String
  }
});

module.exports = mongoose.model('apikey', apikeySchema);