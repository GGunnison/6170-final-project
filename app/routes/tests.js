var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

// run the students test
router.get('/students', function (req, res) {
  res.render('tests/tests.jade', { testType: "students" });
});

// run the employers tests
router.get('/employers', function (req, res) {
  res.render('tests/tests.jade', { testType: "employers" });
});

// TODO move to employers
// run the employers tests
router.get('/employers2', function (req, res) {
  res.render('tests/tests.jade', { testType: "employers2" });
});

module.exports = router;
