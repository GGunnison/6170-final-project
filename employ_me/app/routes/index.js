var express  = require('express');
var router   = express.Router();

module.exports = function(passport) {
  // normal routes ===============================================================

  // show the home page (will also have our login links) router.get('/', function(req, res) {
  router.get('/', function(req, res) {
    res.render('index.jade');
  });

  // PROFILE SECTION =========================
  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.jade', {
      user : req.user
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
    res.render('login.jade', { message: req.flash('loginMessage') });
  });

  // process the login form
  router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  router.get('/signup', function(req, res) {
    res.render('signup.jade', { message: req.flash('signupMessage')});
  });

  // process the signup form
  router.post('/signup/:userType', passport.authenticate('signup/:userType', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
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
