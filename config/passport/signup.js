var LocalStrategy = require('passport-local').Strategy;
var bCrypt        = require('bcrypt-nodejs');
var validator     = require('validator');
var async         = require('async');

// database models
var User = { Student  : require('../../app/models/StudentModel'),
             Employer :  require('../../app/models/EmployerModel')}

// author: Sabrina Drammis, Grant Gunnison
module.exports = function (passport) {
  passport.use('signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route
  },
  function (req, email, password, done) {
    if (req.body.passwordConfirm !== password) return done( null, false, req.flash('error', 'Password fields do not match'));

    // normalize the email
    if (email) email = validator.trim(email.toLowerCase());

    // student isn't logged in
    if ( !req.user ) {
      async.parallel({
        isStudent: function (cb) {
            User.Student.findOne({'email' : email}, function (err, student) {
              if (err) { console.log(err); return done(err); }
              if (student) { cb(null, true) } else { cb(null, false) }
            });
          },
        isEmployer: function (cb) {
            User.Employer.findOne({'email' : email}, function (err, employer) {
              if (err) { console.log(err); return done(err); }
              if (employer) { cb(null, true) } else { cb(null, false) }
            });
          }
        },
        function (err, results) {
          if (results.isStudent || results.isEmployer) return done(null, false, req.flash('error', 'Email is already taken.') );
          var newUser = new User[req.body.type]();

          newUser.email    = email;
          newUser.password = newUser.generateHash(password);
          newUser.name     = req.body.name;

          switch (req.body.type) {
            case "Student":
              break;
            case "Employer":
              newUser.company  = req.body.company;
              newUser.verified = false;
              break;
          }

          newUser.save( function (err) {
            if (err) {
              console.log(err);
              var message = err.errors[Object.keys(err.errors)].message
              return done( null, false, req.flash('error', message) );
            }
            return done(null, newUser);
          });
        })
    } else {
      return done(null, req.user);
    }
  }
  ));
}
