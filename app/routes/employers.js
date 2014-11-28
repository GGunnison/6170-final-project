var router = require('express').Router();
var utils  = require('../utils/utils.js');
var assert = require('assert');

var Employer = require('../models/EmployerModel.js');

/* Search for employers
 *
 * GET /employers
 *
 * TODO write this route and spec
 */
router.get('/', function (req, res) {
  Employer.find({}, function (err, students) {
    // render employer search page
  });
});


/* Get a specific employer.
 *
 * GET /employers/:employerId
 *
 */
router.get('/:employerId', function (req, res) {
  Employer.findById(req.params.studentId, function (req, res) {

  });
});

router.get('/:employerId/listings', function (req, res) {

});

router.get('/:employerId/listings/:listingId', function (req, res) {

});

router.post('/:employerId/listings/:listingId', function (req, res) {

});

router.delete('/:employerId/listings/:listingId', function (req, res) {

});
