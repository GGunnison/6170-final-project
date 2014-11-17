var mongoose   = require('mongoose');
var EmployerSchema = require('../schemas/EmployerSchema');

module.exports = mongoose.model('Employer', EmployerSchema);