var express  = require('express');
var router   = express.Router();
var utils    = require('../utils/utils');

/* Go to profile page
 * Must be a logged in user
 *
 * GET /profile
 *
 * renders the profile page
 */
router.get('/', utils.isLoggedIn, function (req, res) {
  res.render('profile.jade', {user: req.user});
});

module.exports = router;
