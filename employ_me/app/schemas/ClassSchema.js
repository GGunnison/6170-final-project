var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = mongoose.Schema({

	name: String,
	number : String,
	skills : [{type: Schema.ObjectId, ref:'Skill'}]

});

module.exports = ClassSchema;
