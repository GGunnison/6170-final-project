var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Listing = require('../models/ListingModel.js')

// author(s): Sabrina Drammis

/* Get all listings
 *
 * GET /listings
 *
 * TODO do the spec
 */
router.get('/', function (req, res) {
  Listing.find({}, function (err, lisings) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {
      utils.sendSuccessResponse(res, listings);
    }
  });
});
