var UserSchema       = require('./UserSchema.js'),
    ExperienceSchema = require('./ExperienceSchema.js'),
    extend           = require('mongoose-schema-extend');

// author: grant, sabrina

var StudentSchema = UserSchema.extend({
  classes    : [{type: String, ref: 'Class'}],
  skills     : [{type: String, ref: 'Skill'}],
  experience : [ExperienceSchema]
});

module.exports = StudentSchema;
