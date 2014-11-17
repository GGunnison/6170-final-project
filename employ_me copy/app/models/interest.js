var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = mongoose.Schema({

	name: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Interest', interestSchema);