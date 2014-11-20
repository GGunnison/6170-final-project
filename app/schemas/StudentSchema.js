var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    UserSchema = require('./UserSchema.js'),
    extend     = require('mongoose-schema-extend');

// author: grant, sabrina

var StudentSchema = UserSchema.extend({
  classes      : [{type: String, ref: 'Class'}],
  clubs        : [{type: Schema.ObjectId, ref: 'Club'}],
  interests    : [{type: Schema.ObjectId, ref: 'Interest'}],
  jobInterests : [{type: Schema.ObjectId, ref: 'Job'}],
  skills       : [{type: String, ref: 'Skill'}],
  sports       : [{type: Schema.ObjectId, ref: 'VarsitySport'}]
});

module.exports = StudentSchema;
