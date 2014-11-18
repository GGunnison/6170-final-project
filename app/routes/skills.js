var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Skill = require('../models/SkillModel');

/* Get all of the skills
 *
 * GET /skills
 * Response:
 *    - success 200:
 *        responds with all skills in the database
 */
router.get('/', function(req, res) {
  Skill.find({}, function (err, skills) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {
      utils.sendSuccessResponse(res, skills);
    }
  });
});

module.exports = router;
