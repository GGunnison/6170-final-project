// Author: Grant Gunnison

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  to      : String,
  toId    : String,
  from    : String,
  fromId  : String,
  title   : String,
  content : String

});

module.exports = MessageSchema;
