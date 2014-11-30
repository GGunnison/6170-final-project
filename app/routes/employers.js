var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

var Employer = require('../models/EmployerModel.js');
var Skill   = require('../models/SkillModel');

/* Returns json list of employers that have at least one 
 * requiredSkill in any of their listings. Only students
 * can hit this route.
 *
 * GET /employers
 *
 * Body:
 *   - requiredSkills: a list of Tag _ids
 *
 * Response:
 *   - success: 200:
 *       if the search worked and renders a results page
 *
 * author: Sam Edson
 *
 * TODO test
 */
router.get('/', utils.isLoggedInStudent, function(req, res) {
  var requiredSkills = req.body.requiredSkills || [];
  // Filter employers that do not have one requiredSkill in any of
  // their listings
  Employer.find({}, function(err, employers) {
    if (err) {
      console.log("error at GET /employers", err);
      utils.sendErrResponse(res, 500, null);
    } else {
      employers = employers.filter( function(employer) {
        for (var i = 0, len = employer.listings.length; i < len; i++) {
          var listing = employer.listings[i];
          for (var j = 0, len = listing.skills.length; j < len; j++) {
            var skill = listing.skill[j];
            if (skill in requiredSkills) {
              return true;
            }
          }
        }
        return false;
      });
      res.json({ employers: employers });
    }
  });
});

/* Get a specific employer.
 *
 * GET /employers/:employerId
 *
 * Body:
 *   - employerId: an _id for an Employer
 *
 * Response:
 *    - success: 200:
 *        responds with the requested employer
 *    - error 404:
 *        if the employerId is not valid
 *
 * TODO test
 */
router.get('/:employerId', utils.isLoggedInEmployer, function (req, res) {
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
 * Params:
 *   - employerId: an _id for an Employer
 *
 * Response:
 *    - success: 200:
 *        responds with the requested employer's listings
 *        listings contain the skills assocaited with them
 *    - error 404:
 *        if the employerId is not valid
 *
 * TODO test
 */
router.get('/:employerId/listings', utils.isLoggedInEmployer, function (req, res) {
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
 * Params:
 *   - employerId: an _id for an Employer
 *
 * Body:
 *    - listing: Listing object to be added to the
 *               Employer's listings
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully added
 *    - error 404:
 *        if the studentId is not valid
 *
 * TODO test
 */
router.post('/:employerId/listings', utils.isLoggedInEmployer, function (req, res) {
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
 * Params:
 *   - employerId: an _id for an Employer
 *   - listingId: an _id for an Listing
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully found
 *    - error 404:
 *        if the employerId or listingId is not valid
 *
 * TODO test and spec
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
 *
 * Params:
 *   - employerId: an _id for an Employer
 *   - listingId: an _id for an Listing
 *
 * Body:
 *   - listing: a new listing object that will be updated
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully updated
 *
 * TODO test
 */
router.put('/:employerId/listings/:listingId', utils.isLoggedInEmployer, function (req, res) {
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
});

/* Remove an employer's listing
 *
 * DELETE /employers/:employerId/listing/:listingId
 *
 * Params:
 *   - employerId: an _id for an Employer
 *   - listingId: an _id for an Listing
 *
 * Response:
 *    - success: 200:
 *        if the listing was successfully found
 *    - error 404:
 *        if the employerId or listingId is not valid
 *
 * TODO test
 */
router.delete('/:employerId/listings/:listingId', utils.isLoggedInEmployer, function (req, res) {
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
});


module.exports = router;
