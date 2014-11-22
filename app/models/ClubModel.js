var mongoose   = require('mongoose');
var ClubSchema = require('../schemas/ClubSchema');

module.exports = mongoose.model('Club', ClubSchema);
