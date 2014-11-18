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
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    Student.findById(id,function(err,user){
        console.log("1");
        if(user){
            done(null,user);
        }else{
            Employer.findById(id, function(err,user){
                console.log("got here");
                if(err) done(err);
                done(null,user);
            });
        }
    });
});

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
