var mongoose    = require('mongoose');
var ClassSchema = require('../schemas/ClassSchema');
var utils       = require('../utils/utils.js');

// author(s): Sabrina Drammis

var Class = mongoose.model('Class', ClassSchema);

// validators
Class.schema.path('_id').validate(utils.checkLength, "_id cannot be empty");
Class.schema.path('name').validate(utils.checkLength, "name cannot be empty");

module.exports = Class;
