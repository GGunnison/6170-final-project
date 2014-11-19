var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    UserSchema = require('./UserSchema.js'),
    extend     = require('mongoose-schema-extend');

// author: grant

var EmployerSchema = UserSchema.extend({
  company : String
});

module.exports = EmployerSchema;
