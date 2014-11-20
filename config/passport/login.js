var LocalStrategy = require('passport-local').Strategy;
var Student   = require('../../app/models/StudentModel');
var Employer   = require('../../app/models/EmployerModel');

var bCrypt    = require('bcrypt-nodejs');
var validator = require('validator');

// TODO simplify this down to one route for users and employers
// author: Grant Gunnison
module.exports = function(passport){
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login/student', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        var userType = req.params.userType;

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous

        process.nextTick(function() {
            if (!validator.isEmail(email)) {
              return done(null, false, req.flash('loginMessage', 'Invalid email.'));
            }
            Student.findOne({ 'email' :  email }, function(err, student) {
                // if there are any errors, return the error
                if (err) {
                  console.log(err);
                  return done(err);
                }
                 // if no user is found, return the message
                if (!student) {
                  console.log('no user');
                  return done(null, false, req.flash('loginMessage', 'No user found.'));

                } else {
                  if (!student.validPassword(password)) {
                      console.log('bad pass');
                      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                  // all is well, return user
                  } else {
                      console.log('user', student);
                      return done(null, student);
                  }

                }

            });

        });
    }));

passport.use('login/employer', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        var userType = req.params.userType;

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous

        process.nextTick(function() {
            if (!validator.isEmail(email)) {
              return done(null, false, req.flash('loginMessage', 'Invalid email.'));
            }
            Employer.findOne({ 'email' :  email }, function(err, employer) {
                        // if there are any errors, return the error
                        if (err) {
                          console.log(err);
                          return done(err);
                        }

                        // if no user is found, return the message
                        if (!employer) {
                          console.log('no user');
                          return done(null, false, req.flash('loginMessage', 'No user found.'));
                        }

                        if (!employer.validPassword(password)) {
                            console.log('bad pass');
                            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                        // all is well, return user
                        } else {
                            console.log('user', employer);
                            return done(null, employer);
                        }
                    });

        });
    }));



}

