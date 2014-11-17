var LocalStrategy   = require('passport-local').Strategy;
var Student   = require('../../app/models/StudentModel');
var Employer = require('../../app/models/EmployerModel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('signup/:userType', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        var userType = req.params.userType;
        console.log(userType);
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            console.log("student");
            // if the user is not already logged in:
            if (!req.user && userType === 'student') {

                Student.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {                        

                        var newUser = new Student();
                        
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.name = req.body.name
               

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                

                });
            } else if (!req.user && userType === 'employer') {
                console.log("employer");
                Employer.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {                        

                        var newUser = new Employer();
                        
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.name = req.body.name
               

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                

                });

            }else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));
}

