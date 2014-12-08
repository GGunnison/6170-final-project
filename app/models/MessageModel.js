var mongoose    = require('mongoose');
var MessageSchema = require('../schemas/MessageSchema');
var utils       = require('../utils/utils.js');

// author: Grant Gunnison

var Message = mongoose.model('Message', MessageSchema);

// validators
Message.schema.path('to').validate(utils.checkLength, "Destination cannot be empty");
Message.schema.path('from').validate(utils.checkLength, "Sender cannot be empty");
Message.schema.path('title').validate(utils.checkLength, "Title cannot be empty");
Message.schema.path('content').validate(utils.checkLength, "Body cannot be empty");


// presave
//Message.schema.pre('save', function (next) {
//  utils.escape(this.name);
//  next();
//});

module.exports = Message;
