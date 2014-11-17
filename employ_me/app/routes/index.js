var express  = require('express');
var router   = express.Router();

// database models
var Class = require('../models/ClassModel');
var Skill = require('../models/SkillModel');

module.exports = function(passport) {
  // normal routes ===============================================================

  // show the home page (will also have our login links) router.get('/', function(req, res) {
  router.get('/', function(req, res) {
    res.render('index.jade', {signupMessage: req.flash('signupMessage'),
                              loginMessage: req.flash('loginMessage')
                             });
  });

  // PROFILE SECTION =========================
  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.jade', {
      user : req.user
    });
  });

  router.get('/profile/create', isLoggedIn, function(req, res) {
    //Class.find({}, function() {
    //  Skills.find....
    //    res.render('asdf.jade', {skills: skills, classes: classes});
    //});
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

  // process the login form
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
  router.post('/signup/:userType', passport.authenticate('signup/:userType', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  return router;
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
