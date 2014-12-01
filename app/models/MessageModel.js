var mongoose    = require('mongoose');
var MessageSchema = require('../schemas/MessageSchema');
var utils       = require('../utils/utils.js');

// author: Grant Gunnison

var Message = mongoose.model('Message', MessageSchema);

// validators
Message.schema.path('To').validate(utils.checkLength, "Destination cannot be empty");
Message.schema.path('From').validate(utils.checkLength, "Sender cannot be empty");
Message.schema.path('Title').validate(utils.checkLength, "Title cannot be empty");
Message.schema.path('Body').validate(utils.checkLength, "Body cannot be empty");


module.exports = Message;
