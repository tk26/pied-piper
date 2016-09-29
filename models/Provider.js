const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  pidKey : Number,
  FirstName: String,
  LastName: String,
  City: String,
  Add1: String,
  Add2: String,
  Spec: String,
  Degree: String,
  FullName: String,
  Phone: String,
  City: String,
  St: String
  //,
  //favoritedBy : Array
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;