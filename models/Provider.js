const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  pidKey : Number,
  FirstName: String,
  LastName: String,
  City: String,
  Add1: String,
  Add2: String,
  Spec: String
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;