var mongoose    = require('mongoose');
var SportSchema = require('../schemas/SportSchema');

module.exports = mongoose.model('Sport', SportSchema);

