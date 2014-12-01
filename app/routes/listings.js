var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Listing = require('../models/ListingModel.js')

// author(s): Sabrina Drammis

/* Get all listings
 *
 * GET /listings
 *
 * Response:
 *    - success 200
 *        responds with all listings in the database
 *
 * author: Sabrina Drammis
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
