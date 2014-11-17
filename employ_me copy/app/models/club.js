var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubSchema = mongoose.Schema({

	name: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Club', clubSchema);