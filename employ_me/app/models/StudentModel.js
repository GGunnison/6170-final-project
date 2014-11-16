var mongoose      = require('mongoose');
var StudentSchema = require('../schemas/StudentSchema');

module.exports = mongoose.model('Student', StudentSchema);
