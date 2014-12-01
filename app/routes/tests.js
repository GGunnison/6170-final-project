var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

// run the students test
router.get('/students', function (req, res) {
  res.render('tests/students_tests.jade');
});

// run the employers tests
router.get('/employers', function (req, res) {
  res.render('tests/employers_tests.jade');
});

module.exports = router;
