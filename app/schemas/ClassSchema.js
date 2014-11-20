var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// authors: grant, sabrina

var ClassSchema = mongoose.Schema({

  _id: String,
	name: String,
	skills : [{type: String, ref:'Skill'}] // this is a string because Skill _id is a string

});

module.exports = ClassSchema;
