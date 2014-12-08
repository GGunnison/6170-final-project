var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    UserSchema    = require('./UserSchema.js'),
    ListingSchema = require('./ListingSchema.js'),
    deepPopulate  = require('mongoose-deep-populate'),
    extend        = require('mongoose-schema-extend'),
    bcrypt        = require('bcrypt-nodejs');

// author(s): Grant Gunnison, Sabrina Drammis

var EmployerSchema = UserSchema.extend({
  company    : String,
  isVerified : Boolean,
  listings   : [ListingSchema]
});

EmployerSchema.plugin(deepPopulate);

// generating a hash
EmployerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
EmployerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = EmployerSchema;
