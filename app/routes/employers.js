var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

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
 * TODO
 */
router.post('/:employerId/listings', function (req, res) {
  // TODO if listing is null then don't allow adding
  Employer.findByIdAndUpdate(
    req.params.employerId,
    { $push : { listings: req.body.listing } },
    function (err, employer) {
      if (err) {
        console.log(err);
        utils.sendErrResponse(res, 500, null);
      } else if (employer) {
        utils.sendSuccessResponse(res, null);
      } else {
        utils.sendErrResponse(res, 404, 'employer was not found');
      }
    });
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
router.put('/:employerId/listings/:listingId', function (req, res) {
  var set = req.body.listing;
  set._id = mongoose.Types.ObjectId(req.params.listingId);
  Employer.update({_id: req.params.employerId, 'listings._id': req.params.listingId},
                  { $set: {'listings.$': set}},
                  function (err, success) {
                    if (success) {
                      utils.sendSuccessResponse(res, null);
                    } else {
                      if (err) console.log(err);
                      utils.sendErrResponse(res, 500, null);
                    }
                  });
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
        console.log("error at DELETE /employers/:employerId/listings/:listingId", err);
        utils.sendErrResponse(res, 500, null);
      } else if (employer) {
        utils.sendSuccessResponse(res, null);
      } else {
        utils.sendErrResponse(res, 404, 'employer was not found');
      }
  });
});

module.exports = router;
