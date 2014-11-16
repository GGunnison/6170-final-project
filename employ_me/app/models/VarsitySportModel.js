var mongoose    = require('mongoose');
var SportSchema = require('../schemas/VarsitySportSchema');

module.exports = mongoose.model('Sport', SportSchema);

