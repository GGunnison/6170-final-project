// Author: Grant Gunnison

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  to  : String,     //Reciever of message
  from  : String,   //Sender of message
  title : String,   //title of message
  body  : String    //content of message

});

module.exports = MessageSchema;
