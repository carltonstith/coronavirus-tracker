const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Cases = require('../models/cases');

// GET All Cases
router.get('/', (req, res, next) => {
  res.send('CASES');
});

// Get Case By Id
router.get('/:id', (req, res, next) => {
  Cases.findById(req.params.id, function (err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Post Case
router.post('/', function(req, res, next) {
  Cases.create(req.body, function (err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Update Case

// Delete Case

module.exports = router;