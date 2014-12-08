// Authors: Samuel Edson, Sabrina Drammis

var router    = require('express').Router();
var utils     = require('../utils/utils.js');
var assert    = require('assert');
var mongoose  = require('mongoose');
var validator = require('validator');
var async     = require('async');

// database models
var Employer = require('../models/EmployerModel.js');
var Skill    = require('../models/SkillModel');

/* Returns json list of employers that have at least one
 * requiredSkill in any of their listings. Orders by number
 * of total matches.
 *
 * Only students can hit this route.
 *
 * GET /employers
 *
 * Body:
 *   - requiredSkills: a list of Tag _ids
 *
 * Response:
 *   - success 200
 *        responds with the a list of employers
 *
 * author: Sam Edson
 */
router.get('/', utils.isLoggedInStudent, function(req, res) {
  var requiredSkills = req.query.requiredSkills || [];
  var desiredSkills  = req.query.desiredSkills || [];
  // Filter employers that do not have one requiredSkill in any of
  // their listings
  Employer.find({}, function(err, employers) {
    if (err) {
      console.log("error at GET /employers", err);
      utils.sendErrResponse(res, 500, null);
    } else {
      async.each(employers, function(employer, cb) {
        employer.deepPopulate('listings.skills', function (err) {
          if (err) console.log(err);
          cb();
        });
      }, function(err) {
        var scores = {};
        var listings = [];
        employers.forEach( function(employer) {
          for (var i = 0; i < employer.listings.length; i++) {
            var keep = false;
            // We want empty queries to return everything
            if ((requiredSkills.length === 0) &&
                (desiredSkills.length === 0)) keep = true;
            var listing = employer.listings[i] || { skills:{} };
            scores[listing._id] = 0;
            for (var j = 0;  j < listing.skills.length; j++) {
              var skill = listing.skills[j]._id;
              // Increment the score and keep it if in required
              if (requiredSkills.indexOf(skill) > -1) {
                scores[listing._id] += 1;
                keep = true;
              }
              // Increment the score if just desired
              if (desiredSkills.indexOf(skill) > -1) {
                scores[listing._id] += 1;
              }
            }
            if (keep) {
              // create object to return
              var responseListing = {
                _id          : listing._id,
                title        : listing.title,
                description  : listing.description,
                position     : listing.position,
                location     : listing.location,
                skills       : listing.skills,
                employerName : employer.name,
                employerId   : employer._id,
                company      : employer.company,
                email        : employer.email,
              };
              listings.push(responseListing);
            }
          }
        });
        // Sort by number of total matches
        listings.sort(function(x, y) {
          return scores[x._id] < scores[y._id];
        });
        // Send the response
        utils.sendSuccessResponse(res, listings);
      });
    }
  });
});

/* Get a specific employer's information.
 * Must be logged in
 *
 * GET /employers/:employerId
 *
 * Body:
 *   - employerId: an _id for an Employer
 *
 * Response:
 *    - success 200
 *        responds with the requested employer
 *    - error 404
 *        if the employerId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:employerId', utils.isLoggedIn, function (req, res) {
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
 * Must be logged in.
 *
 * GET /employers/:employerId/listings
 *
 * Params:
 *   - employerId: an _id for an Employer
 *
 * Response:
 *    - success 200
 *        responds with the requested employer's listings
 *        listings contain the skills assocaited with them
 *    - error 404
 *        if the employerId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:employerId/listings', utils.isLoggedIn, function (req, res) {
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

/* Add a new listing.
 * Only a logged in employer can add a listing to their listings.
 *
 * Params:
 *   - employerId: an _id for an Employer
 *                 must be the logged in employer's _id
 *
 * Body:
 *    - listing: Listing object to be added to the
 *               Employer's listings
 *
 * Response:
 *    - success 200
 *        if the listing was successfully added
 *    - error 403
 *        if the user making the request is not the logged in employer
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.post('/:employerId/listings', utils.isLoggedInEmployer, function (req, res) {
  if (req.user._id.toString() === req.params.employerId) {
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
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

/* Get specific employer listing.
 *
 * GET /employers/:employerId/listings/:listingId
 *
 * Params:
 *   - employerId: an _id for an Employer
 *   - listingId: an _id for an Listing
 *
 * Response:
 *    - success 200
 *        if the listing was successfully found
 *    - error 404
 *        if the employerId or listingId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:employerId/listings/:listingId', utils.isLoggedInEmployer, function (req, res) {
  Employer.findById(req.params.employerId, function (err, employer) {
    if (err) {
      console.log("error at GET /employers/:employerId/listings/:listingId",
                  err);
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
 * Only a logged in employer can update their listing
 *
 * Params:
 *   - employerId: an _id for an Employer
 *                 must be the logged in employer's _id
 *   - listingId: an _id for an Listing
 *
 * Body:
 *   - listing: a new listing object that will be updated
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully updated
 *    - error 403
 *        if the user making the request is not the logged in employer
 *
 * author: Sabrina Drammis
 */
router.put('/:employerId/listings/:listingId', utils.isLoggedInEmployer, function (req, res) {
  if (req.user._id.toString() === req.params.employerId) {
    var set = req.body.listing;
    set._id = mongoose.Types.ObjectId(req.params.listingId);
    Employer.update({ _id: req.params.employerId,
                      'listings._id': req.params.listingId },
                    { $set: {'listings.$': set}},
                    function (err, success) {
                      if (success) {
                        utils.sendSuccessResponse(res, null);
                      } else {
                        if (err) console.log(err);
                        utils.sendErrResponse(res, 500, null);
                      }
                    });
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

/* Remove an employer's listing
 * Only a logged in employer can remove their listings
 *
 * DELETE /employers/:employerId/listing/:listingId
 *
 * Params:
 *   - employerId: an _id for an Employer
 *                 must be the logged in employer's _id
 *   - listingId: an _id for an Listing
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully found
 *    - error 404:
 *        if the employerId or listingId is not valid
 *    - error 403
 *        if the user making the request is not the logged in employer
 *
 * author: Sabrina Drammis
 */
router.delete('/:employerId/listings/:listingId', utils.isLoggedInEmployer, function (req, res) {
  if (req.user._id.toString() === req.params.employerId) {
    Employer.findByIdAndUpdate(
      req.params.employerId,
      { $pull: { listings: { _id: req.params.listingId }}},
      function (err, employer) {
        if (err) {
          console.log("error at DELETE \
                      /employers/:employerId/listings/:listingId", err);
          utils.sendErrResponse(res, 500, null);
        } else if (employer) {
          utils.sendSuccessResponse(res, null);
        } else {
          utils.sendErrResponse(res, 404, 'employer was not found');
        }
    });
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

module.exports = router;
