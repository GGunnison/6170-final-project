var mongoose      = require('mongoose');
var ListingSchema = require('../schemas/ListingSchema.js');

module.exports = mongoose.model('Listing', ListingSchema);

