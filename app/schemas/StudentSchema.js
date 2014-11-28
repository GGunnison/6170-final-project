var UserSchema       = require('./UserSchema.js'),
    ExperienceSchema = require('./ExperienceSchema.js'),
    extend           = require('mongoose-schema-extend'),
    deepPopulate     = require('mongoose-deep-populate');

// author: Grant Gunnison, Sabrina Drammis

var StudentSchema = UserSchema.extend({

  classes    : [{type: String, ref: 'Class'}],
  skills     : [{type: String, ref: 'Skill'}],
  experience : [ExperienceSchema]

});

StudentSchema.plugin(deepPopulate);

module.exports = StudentSchema;
