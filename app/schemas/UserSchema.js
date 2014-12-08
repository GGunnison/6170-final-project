var mongoose = require('mongoose');

// author: Grant Gunnison, Sabrina Drammis

var UserSchema = mongoose.Schema({

        name	 : String, // User's full name
        email    : String, // User's login and contact email
        password : String, // User's account password
        summary  : String, // Summary about the user (either a student or company bio)
        website  : String, // Link to personal or company website

});

module.exports = UserSchema;
