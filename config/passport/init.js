var login  = require('./login');
var signup = require('./signup');
var Student  = require('../../app/models/StudentModel');
var Employer = require('../../app/models/EmployerModel')
var User = { Student  : require('../../app/models/StudentModel'),
             Employer :  require('../../app/models/EmployerModel')
           }

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, { _id: user._id, __t: user.__t} );
    });

    // used to deserialize the user
    // author: Grant Gunnison
    passport.deserializeUser(function(user, done) {
      User[user.__t].findById(user._id, function (err, user) {
        if (err) done(err);
        done(null, user);
      });
});

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
