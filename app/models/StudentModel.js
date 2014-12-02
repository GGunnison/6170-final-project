var mongoose      = require('mongoose');
var validator     = require('validator');
var utils         = require('../utils/utils.js');
var StudentSchema = require('../schemas/StudentSchema');

// author(s): Sabrina Drammis

var Student = mongoose.model('Student', StudentSchema);

/* Check that the provided email is an MIT.edu email
 *
 * @email to be checked
 */
var checkStudentEmail = function (email) {
  return validator.isEmail(email) && validator.contains(email, '@mit.edu');
};

// validators
Student.schema.path('email').validate(checkStudentEmail, "Must be a valid MIT email");
Student.schema.path('name').validate(utils.checkLength, "name cannot be empty");
Student.schema.path('password').validate(utils.checkLength, "password cannot be empty");
Student.schema.path('website').validate(utils.checkURL, "website must be a valid URL");


// presave
Student.schema.pre('save', function (next) {
  utils.escape(this.name);
  next();
});


module.exports =  Student;
