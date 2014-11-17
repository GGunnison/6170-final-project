var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = mongoose.Schema({

	name: String,
	number : String,
	skills : [{type: String, ref:'Skill'}] // this is a string because Skill _id is a string

});

module.exports = ClassSchema;
