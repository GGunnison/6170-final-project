var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');
var async    = require('async');

// database models
var Class = require('../models/ClassModel');
var Skill = require('../models/SkillModel');
var User  = { Student  : require('../../app/models/StudentModel'),
             Employer :  require('../../app/models/EmployerModel')}

/* TODO spec
 */
router.get('/', utils.isLoggedIn, function (req, res) {
  res.render('profile.jade');
});

/* TODO spec
 *
 */
router.get('/create', utils.isLoggedIn, function (req, res) {
  console.log('fooooo', req.user.__t);
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
        data._id = req.user._id;
        res.render('studentProfileCreation.jade', data);
      });
      break;
    case 'Employer':
      // TODO create profile creation view for the employer
      res.render('index.jade');
      break;
  }
});

/* TODO
 */
//router.get('/profile/edit', utils.isLogedIn, function (req, res) {
//  utils.sendErrResponse(res, 404, "editing profile currently not available");
//});

module.exports = router;
