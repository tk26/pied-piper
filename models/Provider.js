const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  City: String,
  Add1: String,
  Add2: String
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;