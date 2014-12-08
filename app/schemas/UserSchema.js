var mongoose = require('mongoose');
var MessageSchema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
// author: Grant Gunnison, Sabrina Drammis

var UserSchema = mongoose.Schema({

        name	 : String, // User's full name
        email    : String, // User's login and contact email
        password : String, // User's account password
        summary  : String, // Summary about the user (either a student or company bio)
        website  : String, // Link to personal or company website
       
        mailbox  : {
        			
                    inbox   : [{type: ObjectId, ref: 'Message'}],
                    sentbox : [{type: ObjectId, ref: 'Message'}]
                   }
});

module.exports = UserSchema;
