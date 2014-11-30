// Authors: Sabrian Drammis
var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

// database models
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');

router.get('/', function (req, res) {
  // render the search view here
  res.render('employerSearchCreation');
});

module.exports = router;