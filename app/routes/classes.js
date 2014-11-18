var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Class = require('../models/ClassModel');

/* Get all classes
 *
 * GET /classes
 * Response:
 *    - success 200:
 *        responds with all classes in the database
 */
router.get('/', function(req, res) {
  Class.find({}, function(err, classes) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {
      utils.sendSuccessResponse(res, classes);
    }
  });
});

module.exports = router;
