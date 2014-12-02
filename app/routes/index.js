// Author: Grant Gunnison, Samuel Edson

var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

// database models
var Class    = require('../models/ClassModel');
var Skill    = require('../models/SkillModel');
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');

// Routes for logging in with passport
module.exports = function (passport) {
  // show the home page
  router.get('/', function(req, res) {
    if ( !req.user ) {
      res.render('index.jade',
                 { signupMessage: req.flash('signupMessage'),
                   loginMessage: req.flash('loginMessage')
                 });
    } else {
      res.redirect('/search');
    }
  });

  // LOGOUT
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // show the login form
  router.get('/login', function(req, res) {
    res.render('index.jade', { message: req.flash('loginMessage') });
  });

  // process the login form
  router.post('/login', passport.authenticate('login', {
    successRedirect : '/search', // redirect to secure profile section
    failureRedirect : '/', // redirect back to signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP
  // show the signup form
  router.get('/signup', function(req, res) {
    res.render('index.jade', { message: req.flash('signupMessage')});
  });

  // process the signup form
  router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile/create', // redirect to secure profile section
    failureRedirect : '/', // redirect back to signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  return router;
}
