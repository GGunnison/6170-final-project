var mongoose      = require('mongoose');
var validator     = require('validator');
var StudentSchema = require('../schemas/StudentSchema');
var utils         = require('../utils/utils.js');

// author(s): Sabrina Drammis

var Student = mongoose.model('Student', StudentSchema);

/* Check that the provided email is an MIT.edu email
 *
 * @email to be checked
 */
var checkEmail = function (email) {
  return validator.isEmail(email) && validator.contains(email, '@mit.edu');
};

// validators
Student.schema.path('email').validate(checkEmail, "Must be a valid MIT email");
Student.schema.path('name').validate(utils.checkLength, "name cannot be empty");
Student.schema.path('password').validate(utils.checkLength, "password cannot be empty");

module.exports =  Student;
