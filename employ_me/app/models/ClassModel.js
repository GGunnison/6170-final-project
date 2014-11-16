var mongoose    = require('mongoose');
var ClassSchema = require('../schemas/ClassSchema');

module.exports = mongoose.model('Class', ClassSchema);
