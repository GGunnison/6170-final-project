// Author: Grant Gunnison

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  to  : { name: String,
          _id: String },
  from  : { name: String,
            _id: String}
  title : String,
  content  : String

});

module.exports = MessageSchema;
