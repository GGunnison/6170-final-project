var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

// database models
var Class    = require('../models/ClassModel');
var Skill    = require('../models/SkillModel');
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');


module.exports = function (passport) {
  router.get('/tests', function(req, res) {
    res.render('tests.jade');
  });

  // show the home page (will also have our login links)
  // author(s): Grant Gunnison
  // TODO this needs to be updated!!
  router.get('/', function(req, res) {
    if ( !req.user ) {
      res.render('index.jade',
                 { signupMessage: req.flash('signupMessage'),
                   loginMessage: req.flash('loginMessage')
                 });
    } else {
      res.redirect('/profile');
    }
  });

  // LOGOUT ==============================
  // author(s): Grant Gunnison
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
    successRedirect : '/profile/create', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // Separated two post requests because we cannot get req.params from successRedirect
  router.post('/signup/employer', passport.authenticate('signup/employer', {
    successRedirect : '/profile/create', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  return router;
}
