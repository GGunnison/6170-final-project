var LocalStrategy = require('passport-local').Strategy;
var User   = require('../../app/models/UserModel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) {
                  console.log(err);
                  return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                  console.log('no user');
                  return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if (!user.validPassword(password)) {
                    console.log('bad pass');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                // all is well, return user
                } else {
                    console.log('user', user);
                    return done(null, user);
                }
            });
        });
    }));

}

