var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// author: Grant Gunnison, Sabrina Drammis

var SkillSchema = mongoose.Schema({

  	_id : String,
	name  : String

});

module.exports = SkillSchema;
