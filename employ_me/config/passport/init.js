var login  = require('./login');
var signup = require('./signup');
var User   = require('../../app/models/UserModel');

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          console.log('deserializing user:',user);
          done(err, user);
      });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
