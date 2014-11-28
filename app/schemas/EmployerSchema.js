var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    UserSchema    = require('./UserSchema.js'),
    ListingSchema = require('./ListingSchema.js'),
    extend        = require('mongoose-schema-extend');

// author(s): Grant Gunnison, Sabrina Drammis

var EmployerSchema = UserSchema.extend({
  company    : {type: Schema.ObjectId, ref: 'Employer'},
  isVerified : Boolean,
  listings   : [ListingSchema]
});

module.exports = EmployerSchema;
