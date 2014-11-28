var mongoose       = require('mongoose');
var EmployerSchema = require('../schemas/EmployerSchema');
var utils          = require('../utils/utils.js');

var Employer = mongoose.model('Employer', EmployerSchema);

Employer.schema.path('company').validate(utils.checkLength, "company cannot be empty");

module.exports = Employer;
