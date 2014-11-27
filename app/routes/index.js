//Author Grant Gunnison

var express  = require('express');
var router   = express.Router();

// database models
var Class    = require('../models/ClassModel');
var Skill    = require('../models/SkillModel');
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');
var Job      = require('../models/JobModel');
var Interest = require('../models/InterestModel');
var Sport    = require('../models/SportModel');
var Club     = require('../models/ClubModel');


module.exports = function(passport) {
  // normal routes ===============================================================

  router.get('/test', function(req, res) {
    res.render('home.jade');
  });

  // show the home page (will also have our login links)

  router.get('/', function(req, res) {
    //TODO this is hacky we should come up with a cleaner version of this
    if (!req.user){
      res.render('index.jade', {signupMessage: req.flash('signupMessage'),
                                loginMessage: req.flash('loginMessage')
                               });
    }else {
      Student.findOne({email : req.user.email}, function(err, user){
        if (user){
          console.log(user);
          console.log(req.user.email);
          res.redirect('/profile')
        }else{
          res.redirect('/search')
        }
      });
    }
  });

  // PROFILE SECTION =========================
  router.get('/profile', isLoggedIn, function(req, res) {
    // Student
    if (req.user.__t = 'Student') {
      Student.findById(req.user._id)
       .populate('skills')
       .populate('classes')
       .populate('jobInterests')
       .populate('interests')
       .populate('sports')
       .populate('clubs')
       .exec(function(err, student) {
          if (err) {
            console.log(err);
            utils.sendErrResponse(res, 500, null);
          } else {
            console.log("STUDENT: " + student);
            res.render('profile.jade', {
              user : student
            });
          }
       });

    // Employer TODO: Render something
    } else {
      //res.render('profile.jade', {
      //});
    }
  });

  // LOGOUT ==============================
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  router.get('/login', function(req, res) {
    console.log('message ', req.flash('loginMessage'));
    res.render('index.jade', { message: req.flash('loginMessage') });
  });

  // process the login form for student
  router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  router.get('/signup', function(req, res) {
    res.render('index.jade', { message: req.flash('signupMessage')});
  });

  // process the signup form
  router.post('/signup/student', passport.authenticate('signup/student', {
    successRedirect : '/create/student', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // Separated two post requests because we cannot get req.params from successRedirect
  router.post('/signup/employer', passport.authenticate('signup/employer', {
    successRedirect : '/create/employer', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =============================================================================
  // RENDER OTHER PAGES ==========================================================
  // =============================================================================

  // PROFILE CREATION PAGE =======================================================
  /**
   * author: Daniel Sanchez
   */
  router.get('/create/student', isLoggedIn, function(req, res, next) {

    // Get all skills to display on page
    Skill.find({}, function (err, skills) {
      if (err) {
        console.log(err);
        return next(err);
      } else {

        // Get all classes to display on page
        Class.find({}, function (err, classes) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            var viewData = {
              studentId: req.user._id,
              skills: skills,
              classes: classes
            };

            res.render('studentProfileCreation.jade', viewData);
          }
        })
      }
    });
  });

  // EMPLOYER DIRECTED TO SEARCH =================================================
  /**
   * author: Daniel Sanchez
   */
  router.get('/create/employer', isLoggedIn, function(req, res) {
    res.redirect('/search');
  });

  // SEARCH PAGE ========================
  router.get('/search', function(req, res) {
    Skill.find({}, function (err, skills) {
      if (err) {
        console.log(err);
        utils.sendErrResponse(res, 500, null);
      } else {
        res.render('employerSearchCreation.jade', {skills: skills});
      }
    });
  });

  return router;
}


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	//TODO after MVP: Authentication check goes here
  return next();
}
