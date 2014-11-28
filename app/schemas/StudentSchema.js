var UserSchema       = require('./UserSchema.js'),
    ExperienceSchema = require('./ExperienceSchema.js'),
    extend           = require('mongoose-schema-extend'),
    deepPopulate     = require('mongoose-deep-populate'),
    bcrypt           = require('bcrypt-nodejs');

// author: Grant Gunnison, Sabrina Drammis

var StudentSchema = UserSchema.extend({

  classes    : [{type: String, ref: 'Class'}],
  skills     : [{type: String, ref: 'Skill'}],
  experience : [ExperienceSchema]

});

StudentSchema.plugin(deepPopulate);

// generating a hash
StudentSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
StudentSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = StudentSchema;
