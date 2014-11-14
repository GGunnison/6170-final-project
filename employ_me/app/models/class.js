var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = mongoose.Schema({

	name: String,
	number : String,
	skills : [{type: Schema.ObjectId, ref:'Skill'}]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Class', classSchema);