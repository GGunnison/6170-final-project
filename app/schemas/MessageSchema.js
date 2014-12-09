// Author: Grant Gunnison

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  to      : String,	//email of sender
  toId    : String, //Id generated in db 
  from    : String,	//email of sender
  fromId  : String, //Id generate in db
  title   : String,
  content : String

});

module.exports = MessageSchema;
