// author: Grant Gunnison, Sabrina Drammis

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// author: grant

// define the schema for our user model
var UserSchema = mongoose.Schema({

        name	   : String, // User's full name
        email    : String, // User's login and contact email
        password : String, // User's account password
        summary  : String, // Summary about the user (either a student or company bio)
        website  : String, // Link to personal or company website

       /*  TODO mailbox schema
        mailbox  : {
                    inbox   : [messageSchema],
                    sentbox : [messageSchema]
                   }
        */
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = UserSchema;
