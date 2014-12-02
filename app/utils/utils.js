var assert    = require('assert');
var validator = require('validator');

/* This utils is taken from the 6.170 examples */
var utils = {};

/* Send a success response back to the client
 *
 * @res response to send back
 * @content to attatch to the res
 */
utils.sendSuccessResponse = function(res, content) {
  res.status(200).json({content: content});
};

/* Send an error response back to the client
 *
 * @res response to send back
 * @errcode of the response
 * @err message to attach to the response
 */
utils.sendErrResponse = function(res, errcode, err) {
  assert(errcode != null, "err response must have an errcode");
  assert(typeof errcode === "number", "err code must be a number");

  res.status(errcode).json({ error: err });
};

/* Ensure that a string is not empty
 *
 * @s string to check
 */
utils.checkLength = function (s) {
  assert(typeof s === "string", "can only call the checkLength function on a string");
  return s.length > 0;
};

/* Check that there are no duplicates in the array.
 *
 * @array to check for duplicates/type
 */
utils.checkArray = function (array) {
  // TODO
}

/* Determine if a given string is a url
 *
 * @s string to check
 */
utils.checkURL = function (s) {
  assert(typeof s === "string", "can only call the checkURL function on a string");
  return validator.isURL(s);
}

/* Replace <, >, &, ' and " with HTML entitie
 *
 * @s string to sanitize
 */
utils.escape = function (s) {
  assert(typeof s === "string", "can only call the escape function on a string");
  return validator.escape(s);
}

/* Check if the current user is a logged in student
 * Middleware for API
 */
utils.isLoggedInStudent = function (req, res, next) {
  if ( req.isAuthenticated() && (req.user.__t === 'Student') ) {
    return next();
  }
  // if they aren't logged in redired to the home page
  res.redirect('/');
}

/* Check if the current user is a logged in employer
 * Middleware for API
 */
utils.isLoggedInEmployer = function (req, res, next) {
  if ( req.isAuthenticated() && (req.user.__t === 'Employer') ) {
    return next();
  }
  // if they aren't logged in redired to the home page
  res.redirect('/');
}

/* Check if the current user is a logged
 * Middleware for API
 */
utils.isLoggedIn = function (req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/');
}

module.exports = utils;
