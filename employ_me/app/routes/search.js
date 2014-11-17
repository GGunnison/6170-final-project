var express  = require('express');
var router   = express.Router();

/* GET /search
 * Req query:
 *
 */
router.get('/', function(req, res) {

});

/* POST /search
 * Req query:
 *   tags: a list of tags
 *
 * Test:
 *   curl --data "tags[]=java&tags[]=c++&tags=testing" localhost:3000/search
 *
 */
router.post('/', function(req, res) {
  var tags = req.body.tags;

  console.log("TAGS:");
  console.log(tags);

  res.end();
});

module.exports = router;
