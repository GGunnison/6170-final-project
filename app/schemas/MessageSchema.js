var mongoose = require('mongoose');

//Author Grant Gunnison

var MessageSchema = mongoose.Schema({

  to  : String,     //Reciever of message
  from  : String,   //Sender of message
  title : String,   //title of message
  body  : String    //content of message

});

module.exports = MessageSchema;