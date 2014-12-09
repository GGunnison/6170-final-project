var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');

// author: Sabrian Drammis

/* Render the search view
 *
 * GET /search
 */
router.get('/', utils.isLoggedIn, function (req, res) {
  res.render('search', {user: req.user});
});

module.exports = router;
