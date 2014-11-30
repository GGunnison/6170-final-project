var assert = require('assert');

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
  return s.length > 0;
};

/* TODO spec here
 *
 */
utils.isLoggedInStudent = function (req, res, next) {
  if ( req.isAuthenticated() && (req.session.passport.user.__t === 'Student') ) {
    return next();
  }
  // if they aren't logged in redired to the home page
  res.redirect('/');
}

/* TODO spec here
 *
 */
utils.isLoggedInEmployer = function (req, res, next) {
  if ( req.isAuthenticated() && (req.session.passport.user.__t === 'Employer') ) {
    return next();
  }
  // if they aren't logged in redired to the home page
  res.redirect('/');
}

/* TODO spec here
 *
 */
utils.isLoggedIn = function (req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/');
}

module.exports = utils;
