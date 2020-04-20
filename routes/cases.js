const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Cases = require('../models/cases');

// GET All Cases
router.get('/', (req, res, next) => {
  //res.send('CASES');
  Cases.find(function(err, cases) {
    if(err) return next(err);
    res.json(cases);
  });
});

// Get Case By Id
router.get('/:id', (req, res, next) => {
  Cases.findById(req.params.id, function (err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Post a new Case
router.post('/', function(req, res, next) {
  Cases.create(req.body, function (err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Update a Single Case
router.put('/:id', function(req, res, next) {
  Cases.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Delete a Case By Id
router.delete('/:id', function(req, res, next) {
  Cases.findByIdAndDelete(req.params.id, function(err, cases) {
    if (err) return next(err);
    res.json(cases);
  });
});

// Get Statistics
router.get('/daily/:status', function(req, res, next) {
  //res.send('Stats')
  Cases.aggregate([
    {
      $match: { status: req.params.status }
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%m-%d-%Y",
              date: "$updated"
            }
          }
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ], function (err, cases) {
    if(err) return next(err);
    res.json(cases);
  })
})

module.exports = router;