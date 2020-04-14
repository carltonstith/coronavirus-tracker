const mongoose = require('mongoose');

// Case Schema
const CasesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  updated: {
    type: Date
  }
});

const Cases = module.exports = mongoose.model('Cases', CasesSchema);

module.exports.getCaseById = function(id, callback) {
  Cases.findById(id, callback);
}

module.exports.getCaseByName = function(name, callback) {
  const query = {name: name}
  Cases.findOne(query, callback);
}

module.exports.addCase = function(newCase, callback) {}