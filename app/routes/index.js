var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

// database models
var Class    = require('../models/ClassModel');
var Skill    = require('../models/SkillModel');
var Student  = require('../models/StudentModel');
var Employer = require('../models/EmployerModel');

// authors: Sabrina Drammis, Grant Gunnison, Samuel Edson

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

  // process the login form
  // author: Sabrina Drammis
  router.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      // successful login
      if (user) {
        // need to login the user
        req.login(user, function (err) {
          if (err) { console.log(err); return next(err); }
          return res.status(200).end();
        });
      // unsuccessful login
      } else {
        var alertMessage = req.flash('alert')[0] || "Invalid information.";
        res.send({ alertMessage: alertMessage });
      }
    })(req, res, next);
  });

  // process the signup form
  // Sabrina Drammis
  router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
      // successful signup
      if (user) {
        // log in the user
        req.login(user, function (err) {
          if (err) { console.log(err); return next(err); }
          return res.status(200).end();
        });
      // unsuccessful signup
      } else {
        var alertMessage = req.flash('alert')[0] || "Something isn't right.";
        res.send({ alertMessage: alertMessage});
      }
    })(req, res, next);
  });

  return router;
}
