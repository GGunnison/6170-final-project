var mongoose  = require('mongoose');
var JobSchema = require('../schemas/JobSchema');

module.exports = mongoose.model('Job', JobSchema);
