var LocalStrategy   = require('passport-local').Strategy;
var Student   = require('../../app/models/StudentModel');
var Employer = require('../../app/models/EmployerModel');
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

// TODO simplify to only one signup route here that works for both users and employers
// author: Grant Gunnison, Sabrina Drammis
module.exports = function(passport) {
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('signup/student', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = validator.trim(email.toLowerCase()); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            console.log("student");
            // if the user is not already logged in:
            if (!req.user) {

                Student.findOne({ 'email' :  email }, function(err, user) {
                    Employer.findOne({ 'email' :  email }, function(error, user1) {
                    // if there are any errors, return the error
                    if (err || error) {
                        console.log(err);
                        return done(err);
                    }

                    // check to see if theres already a user with that email
                    if (user || user1) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                    } else {
                        var newUser = new Student();

                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.name     = req.body.name

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);

                        });
                    }

                });
              });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));

    passport.use('signup/employer', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if (email)
            email = validator.trim(email.toLowerCase());

        process.nextTick(function() {
            console.log("employer");

            if (!req.user) {
                Employer.findOne({ 'email' :  email }, function(err, user) {
                    Student.findOne({ 'email' :  email }, function(error, user1) {
                    // if there are any errors, return the error
                    if (err || error) {

                        return done(err);
                    }

                    // check to see if theres already a user with that email
                    if (user || user1) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                    } else {
                        var newUser = new Employer();

                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.name     = req.body.name

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);

                        });
                      }

                });
                });
            } else {
                return done(null, req.user);
            }
        })
    }))
}

