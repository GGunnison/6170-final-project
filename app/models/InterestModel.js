var mongoose       = require('mongoose');
var InterestSchema = require('../schemas/InterestSchema');

module.exports = mongoose.model('Interest', InterestSchema);

