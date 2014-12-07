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
      res.render('home.jade');
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
  router.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (user) {
        req.login(user, function (err) {
          if (err) { console.log(err); return next(err); }
          return res.status(200).end();
        });
      } else {
        var alertMessage = req.flash('alert')[0] || "Something isn't right.";
        res.send({ alertMessage: alertMessage });
      }
    })(req, res, next);
  });

  // SIGNUP
  // show the signup form
  router.get('/signup', function(req, res) {
    res.render('index.jade', { message: req.flash('message')});
  });

  // process the signup form
  router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
      if (user) {
        req.login(user, function (err) {
          if (err) { console.log(err); return next(err); }
          return res.status(404).end();
        });
      } else {
        var alertMessage = req.flash('alert')[0] || "Something isn't right.";
        res.send({ alertMessage: alertMessage});
      }
    })(req, res, next);
  });

  return router;
}
