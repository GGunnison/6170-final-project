var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Student = require('../models/UserModel');

/* Search for students
 *
 */
router.get('/', function (req, res) {

});


/* Get a specified student. TODO test this
 *
 * GET /students/:studentId
 *
 * Response:
 *    - success: 200:
 *        responds with the requested student
 *    - error 404:
 *        if the studentId is not valid
 */
router.get('/:studentId', function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else if (student) {
      utils.sendSuccessResponse(res, student);
    } else {
      utils.sendErrResponse(res, 404, 'student was not found');
    }
  });
});

/* Get a student's classes TODO test this
 *
 * GET /students/:studentId/classes
 * Response:
 *    - success: 200:
 *        responds with the requested student's classes
 *    - error 404:
 *        if the studentId is not valid
 */
router.get('/:studentId/classes', function (req, res) {
  Student.findById(req.params.studentId)
         .populate('classes')
         .exec( function (err, student) {
            if (err) {
              console.log(err);
              utils.sendErrResponse(res, 500, null);
            } else if (student) {
              utils.sendSuccessResponse(res, student.classes);
            } else {
              utils.sendErrResponse(res, 404, 'student was not found');
            }
         });
});

/* Set the classes for a student TODO test this
 *
 * POST /students/:studentId/classes
 * Body:
 *    - classes: list of class mongo _ids
 *               set as the student's classes
 * Response:
 *    - success: 200:
 *        if the classes were sucessfully set
 *    - error 404:
 *        if the studentId is not valid
 */
router.post('/:studentId/classes', function (req, res) {
  Student.findById(req.params.userId)
         .update({classes: req.body.classes})
         .exec( function (err, student) {
           if (err) {
             console.log(err);
             utils.sendErrResponse(res, 500, null);
           } else if (student) {
             utils.sendSuccessResponse(res, null);
           } else {
             utils.sendErrResponse(res, 404, 'student was not found');
           }
         });
});
