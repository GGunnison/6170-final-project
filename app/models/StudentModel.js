var mongoose      = require('mongoose');
var validator     = require('validator');
var StudentSchema = require('../schemas/StudentSchema');

// author(s): Sabrina Drammis

Student = mongoose.model('Student', StudentSchema);

/* Check that the provided email is an MIT.edu email
 *
 * @email to be checked
 */
var checkEmail = function (email) {
  return validator.isEmail(email) && validator.contains(email, '@mit.edu');
};

/* Ensure that a string is not empty
 *
 * @s string to check
 */
var checkLength = function (s) {
  return s.length > 0;
};

// validators
Student.schema.path('email').validate(checkEmail, "Must be a valid MIT email");
Student.schema.path('name').validate(checkLength, "Name cannot be empty");
Student.schema.path('password').validate(checkLength, "Password cannot be empty");

module.exports =  Student;
