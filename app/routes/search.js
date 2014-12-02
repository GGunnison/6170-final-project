// Authors: Sabrian Drammis
var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

// database models
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');

/* Render the search view
 *
 * GET /search
 */
router.get('/', utils.isLoggedIn, function (req, res) {
  res.render('searchCreation', {user: req.user});
});

module.exports = router;
