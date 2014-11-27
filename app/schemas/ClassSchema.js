var mongoose = require('mongoose');

// authors: Grant Gunnison, Sabrina Drammis

var ClassSchema = mongoose.Schema({

  _id: String,  // course number (ex: 6.170)
	name: String, // course name (ex: Software Studio)
	skills : [{type: String, ref:'Skill'}] // this is a string because Skill _id is a string

});

module.exports = ClassSchema;
