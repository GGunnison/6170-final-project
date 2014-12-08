var LocalStrategy = require('passport-local').Strategy;
var async         = require('../../node_modules/async/lib/async.js')
var bCrypt        = require('bcrypt-nodejs');
var validator     = require('validator');

// database models
var Student       = require('../../app/models/StudentModel');
var Employer      = require('../../app/models/EmployerModel');

// author(s): Sabrina Drammis, Grant Gunnison
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
      if (email) email = validator.trim(email.toLowerCase());

      if (!validator.isEmail(email)) return done(null, false, req.flash('alert', 'Invalid email.'));


      async.parallel({
        student: function (cb) {
          Student.findOne({email: email}, function (err, student) {
            if (err) { console.log(err); return done(err) }
            if (student) {cb(null, student)} else {cb(null, false)}
          });
        },
        employer: function (cb) {
          Employer.findOne({email: email}, function (err, employer) {
          if (err) { console.log(err); return done(err) }
          if (employer) {cb(null, employer)} else {cb(null, false)}
          });
        }
      },
      function(err, results) {
        if (err) { console.log(err); return done(err); }
        if (results.student && results.student.validPassword(password))
          return done(null, results.student);
        if (results.employer && results.employer.validPassword(password))
          return done(null, results.employer);
        return done(null, false, req.flash('alert', 'Invalid information.'))
      });
// =======
//             function(err, results){
//               if (!results[0] && !results[1]){
//                 return done(null, false, req.flash('loginMessage', 'No user found.'));
//               }
//               if (results[0]){
//                 if (err) {
//                   console.log(err);
//                   return done(err);
//                 }
//                 if (!results[0].validPassword(password)) {
//                   return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
//                 }else{
//                   console.log("student" + results[0]);
//                   return done(null, results[0]);
//                 }
//               }

//               if (results[1]){
//                 if (err) {
//                   console.log(err);
//                   return done(err);
//               }
//                 if (!results[1].validPassword(password)) {
//                   return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
//                 }else{
//                   return done(null, results[1]);
//               }
//             }

//             });
//         });
// >>>>>>> Stashed changes
    }));
}
