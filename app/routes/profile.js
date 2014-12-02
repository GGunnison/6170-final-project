var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');
var async    = require('async');

// database models
var Class = require('../models/ClassModel');
var Skill = require('../models/SkillModel');
var User  = { Student  : require('../../app/models/StudentModel'),
              Employer :  require('../../app/models/EmployerModel')}

/* Go to profile page
 * Must be a logged in user
 *
 * GET /profile
 *
 * renders the profile page
 */
router.get('/', utils.isLoggedIn, function (req, res) {
  res.render('profile.jade', {user: req.user});
});

/* Go to the create profile page
 * Must be a logged in user
 *
 * GET /profile/create
 *
 * renders the appropriate profile creation view
 * dependent on user type
 *
 * author: Sabrina Drammis
 *
 * TODO once profile has been created, a use should not be able to hit this route
 */
router.get('/create', utils.isLoggedIn, function (req, res, next) {
  switch ( req.user.__t ) {
    case 'Student':
      async.parallel({
        skills: function (cb) {
          Skill.find({}, function (err, allSkills) {
            if (err) console.log(err);
            cb(null, allSkills);
          });
        },
        classes: function (cb) {
          Class.find({}, function (err, allClasses) {
            if (err) console.log(err);
            cb(null, allClasses);
          });
        }
      },
      function (err, data) {
        data.id = req.user._id;
        res.render('studentProfileCreation.jade', data);
      });
      break;
    case 'Employer':
      // TODO create profile creation view for the employer

      Skill.find({}, function(err, allSkills) {
        if (err)  {
          console.log(err);
          return next(err);
        }

        var data = {
          skills: allSkills, 
          user: req.user
        }

        res.render('employerProfileCreation.jade', data);
      });

      break;
    default:
      res.redirect('/');
      break;
  }
});

module.exports = router;
