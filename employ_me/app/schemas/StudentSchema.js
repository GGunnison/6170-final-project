var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    UserSchema = require('./UserSchema.js'),
    extend     = require('mongoose-schema-extend');

var StudentSchema = UserSchema.extend({
  classes      : [{type: Schema.ObjectId, ref: 'Class'}],
  clubs        : [{type: Schema.ObjectId, ref: 'Club'}],
  interests    : [{type: Schema.ObjectId, ref: 'Interest'}],
  jobInterests : [{type: Schema.ObjectId, ref: 'Job'}],
  skills       : [{type: Schema.ObjectId, ref: 'Skill'}],
  sports       : [{type: Schema.ObjectId, ref: 'VaristySport'}]
});

module.exports = StudentSchema;
