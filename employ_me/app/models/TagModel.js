var mongoose    = require('mongoose');
var TagSchema = require('../schemas/TagSchema');

module.exports = mongoose.model('Tag', TagSchema);

