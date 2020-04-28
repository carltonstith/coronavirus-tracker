const mongoose = require('mongoose');

// Case Schema
const CasesSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
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
  email: {
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
    type: Date,
    default: Date.now
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