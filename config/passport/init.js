var login  = require('./login');
var signup = require('./signup');
var Student   = require('../../app/models/StudentModel');
var Employer = require('../../app/models/EmployerModel')

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      console.log(user);
      done(null, { _id: user._id, __t: user.__t} );
    });

    // used to deserialize the user
    // author: Grant Gunnison
    // TODO update this to use __t instead of if els
    passport.deserializeUser(function(user, done) {
      console.log(user);
      Student.findById(user._id, function(err, student){
        if (student) {
          done(null, student);
        } else {
          Employer.findById(user._id, function(err, employer){
            if (err) done(err);
            done(null, employer);
          });
        }
    });
});

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
