var mongoose    = require('mongoose');
var MessageSchema = require('../schemas/MessageSchema');
var utils       = require('../utils/utils.js');

// author: Grant Gunnison, Sam Edson

var Message = mongoose.model('Message', MessageSchema);

// validators
Message.schema.path('to').validate(utils.checkLength, "Destination cannot be empty");
Message.schema.path('toId').validate(utils.checkLength, "Destination id cannot be empty");
Message.schema.path('from').validate(utils.checkLength, "Sender cannot be empty");
Message.schema.path('fromId').validate(utils.checkLength, "Sender id cannot be empty");
Message.schema.path('title').validate(utils.checkLength, "Title cannot be empty");
Message.schema.path('content').validate(utils.checkLength, "Body cannot be empty");

module.exports = Message;
