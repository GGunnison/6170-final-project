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
 * TODO test and spec
 */
router.get('/:employerId', function (req, res) {
  Employer.findById(req.params.employerId, function (err, employer) {
    if (err) {
      console.log("error at GET /employers/:employerId", err);
      utils.sendErrResponse(res, 500, null);
    } else if (employer) {
      utils.sendSuccessResponse(res, employer);
    } else {
      utils.sendErrResponse(res, 404, 'employer was not found');
    }
  });
});

/* Get a specific employer's listings.
 *
 * GET /employers/:employerId/listings
 *
 * TODO test and spec
 */
router.get('/:employerId/listings', function (req, res) {
  Employer.findById(req.params.employerId, function (err, employer) {
    if (err) {
      console.log("error at GET /employers/:employerId/listings", err);
      utils.sendErrResponse(res, 500, null);
    } else if (employer) {
      utils.sendSuccessResponse(res, employer.listings);
    } else {
      utils.sendErrResponse(res, 404, 'employer was not found');
    }
  })
});

/* Add a new listing
 *
 *
 */
router.put('/:employerId/listings', function (req, res) {
});

/* Get specific employer listing.
 *
 * GET /employers/:employerId/listings/:listingId
 *
 * TODO test and spec
 */
router.get('/:employerId/listings/:listingId', function (req, res) {
  Employer.findById(req.params.employerId, function (err, employer) {
    if (err) {
      console.log("error at GET /employers/:employerId/listings/:listingId", err);
      utils.sendErrResponse(res, 500, null);
    } else if (employer) {
      var listing = employer.listings.id(req.params.listingId);
      if (listing) {
        utils.sendSuccessResponse(res, listing);
      } else {
        utils.sendErrResponse(res, 404, 'listing was not found');
      }
    } else {
      utils.sendErrResponse(res, 404, 'employer was not found');
    }
  });
});

/* Update a listing
 * TODO
 */
router.put('/:employerId/listing/:listingId', function (req res) {
});

/* Remove an employer's listing
 *
 * DELETE /employers/:employerId/listing/:listingId
 *
 * TODO test and spec
 */
router.delete('/:employerId/listings/:listingId', function (req, res) {
  Employer.findByIdAndUpdate(
    req.params.employerId,
    {$pull: {listings: {_id: req.params.listingId}}},
    function (err, employer) {
      if (err) {
        console.log("error at DELETE /employers/:employerId/listings/:listingId", err):
        utils.sendErrResponse(res, 500, null);
      } else if (employer) {
        utils.sendSuccessResponse(res, null);
      } else {
        utils.sendErrResponse(res, 404, 'employer was not found');
      }
  });
});
