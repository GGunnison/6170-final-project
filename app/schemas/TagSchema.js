var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = mongoose.Schema({
	name: String
});

module.exports = TagSchema;
