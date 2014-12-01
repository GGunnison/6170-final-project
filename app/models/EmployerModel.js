var mongoose       = require('mongoose');
var utils          = require('../utils/utils.js');
var validator      = require('validator');
var EmployerSchema = require('../schemas/EmployerSchema');

// author: Sabrina Drammis

var Employer = mongoose.model('Employer', EmployerSchema);

/* Check that the provided email is of valid email format
 *
 * @email to be checked
 */
var checkEmployerEmail = function (email) {
  return validator.isEmail(email);
}

// validators
Employer.schema.path('company').validate(utils.checkLength, "company cannot be empty");
Employer.schema.path('email').validate(checkEmployerEmail, "Must be a valid email");
Employer.schema.path('name').validate(utils.checkLength, "name cannot be empty");
Employer.schema.path('password').validate(utils.checkLength, "password cannot be empty");

module.exports = Employer;
