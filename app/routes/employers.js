var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

var Employer = require('../models/EmployerModel.js');
var Skill   = require('../models/SkillModel');

/* Search for employers
 *
 * GET /employers
 *
 * TODO write this route and spec
 */
//router.get('/', function (req, res) {
  //Skill.find({}, function (err, skills) {
    //if (err) {
      //console.log(err);
      //utils.sendErrResponse(res, 500, null);
    //} else {
      //res.render('employerSearchCreation.jade', {skills: skills});
    //}
  //});
//});

/* Redirect to a page with every employer that fits the student's
 * requiredSkills
 *
 * POST /employers
 *
 * Body:
 *   - requiredSkills: a list of Tag _ids
 *
 * Response:
 *   - success: 200:
 *       if the search worked and renders a results page
 *
 * author: Sam Edson
 */
router.get('/', function(req, res) {
  var requiredSkills = req.body.requiredSkills || [];

  Employer.find({}, function(err, employers) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {
      console.log(" -- requiredSkills: " + requiredSkills);
      
      employers = employers.filter( function(employer) {
        for (var i = 0, len = employer.listings.length; i < len; i++) {
          var listing = employer.listings[i];
          for (var j = 0, len = listing.skills.length; j < len; j++) {
            var skill = listing.skill[j];
            console.log(" __ skill: " + skill)
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
 * TODO test and spec
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
