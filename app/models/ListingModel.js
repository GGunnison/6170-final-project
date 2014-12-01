var mongoose      = require('mongoose');
var ListingSchema = require('../schemas/ListingSchema.js');
var utils         = require('../utils/utils.js');

// author: Sabrina Drammis

var Listing = mongoose.model('Listing', ListingSchema);

// validators
Listing.schema.path('title').validate(utils.checkLength, 'title cannot be empty');
Listing.schema.path('position').validate(utils.checkLength, 'position cannot be empty');

module.exports = Listing;
