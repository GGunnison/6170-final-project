var LocalStrategy = require('passport-local').Strategy;
var Student   = require('../../app/models/StudentModel');
var Employer   = require('../../app/models/EmployerModel');
var Async = require('../../node_modules/async/lib/async.js')

var bCrypt    = require('bcrypt-nodejs');
var validator = require('validator');

// TODO simplify this down to one route for users and employers
// author: Grant Gunnison
module.exports = function(passport){
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous

        process.nextTick(function() {
            if (!validator.isEmail(email)) {
              return done(null, false, req.flash('loginMessage', 'Invalid email.'));
            }
            Async.parallel([
                    function(callback){
                      var query = Student.findOne({ 'email' :  email });
                      query.exec(function(err, student){
                        if (err){
                          callback(err);
                        }
                        callback(null, student);
                      });
                    },
                    function(callback){
                      var query = Employer.findOne({ 'email' :  email });
                      query.exec(function(err, employer){
                        if (err){
                          callback(err);
                        }
                        callback(null, employer);
                      });
                    }
                  ],

            function(err, results){
              if (!results[0] && !results[1]){
                return done(null, false, req.flash('loginMessage', 'No user found.'));
              }
              if (results[0]){
                if (err) {
                  console.log(err);
                  return done(err);
                }
                if (!results[0].validPassword(password)) {
                  return done(null, false, req.flash('signupMessage', 'That email is invalid.'));
                }else{
                  console.log(results[0]);
                  return done(null, results[0]);
                }
              }

              if (results[1]){
                if (err) {
                  console.log(err);
                  return done(err);
              }
                if (!results[1].validPassword(password)) {
                  return done(null, false, req.flash('signupMessage', 'That email is invalid.'));
                }else{
                  console.log(results[1]);
                  return done(null, results[1]);
              }
            }

            });


                //     // check to see if theres already a user with that email
                //     if (!user && !user1) {
                //         return done(null, false, req.flash('loginMessage', 'No user found.'));

                //     }
                //     // if there are any errors, return the error
                //     if (user){
                //       if (err) {
                //         console.log(err);
                //         return done(err);
                //       }
                //       if (!user.validPassword(password)) {
                //         return done(null, false, req.flash('signupMessage', 'That email is invalid.'));
                //       }else{
                //         return done(null, user);
                //       }
                //     }

                //     // if there are any errors, return the error
                //     if (user1){
                //       if (error) {
                //         console.log(err);
                //         return done(err);
                //       }
                //       if (!user1.validPassword(password)) {
                //         return done(null, false, req.flash('signupMessage', 'That email is invalid.'));
                //       }else{
                //         return done(null, user1);
                //       }
                //     }

                // });
                // });

        });
    }));

//Both Employers and Users log in the same way now.

// passport.use('login/employer', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//     },
//     function(req, email, password, done) {
//         var userType = req.params.userType;

//         if (email)
//             email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
//         // asynchronous

//         process.nextTick(function() {
//             if (!validator.isEmail(email)) {
//               return done(null, false, req.flash('loginMessage', 'Invalid email.'));
//             }
//             Employer.findOne({ 'email' :  email }, function(err, employer) {
//                         // if there are any errors, return the error
//                         if (err) {
//                           console.log(err);
//                           return done(err);
//                         }

//                         // if no user is found, return the message
//                         if (!employer) {
//                           console.log('no user');
//                           return done(null, false, req.flash('loginMessage', 'No user found.'));
//                         }

//                         if (!employer.validPassword(password)) {
//                             console.log('bad pass');
//                             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
//                         // all is well, return user
//                         } else {
//                             console.log('user', employer);
//                             return done(null, employer);
//                         }
//                     });

//         });
//     }));



}

