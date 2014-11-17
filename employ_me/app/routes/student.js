var router = require('express').Router();
var utils  = require('../utils/utils.js');
var ObjectId = require('mongoose').Types.ObjectId;

// database models
var Student = require('../models/UserModel');
var Class   = require('../models/ClassModel');

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
  console.log(req.params.studentId);
  var a = new ObjectId.fromString(req.params.studentId);
  console.log(a);
  Student.findById(a, function (err, student) {
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
 *        classes contain the skills assocaited with them
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
              // deep population
              Class.populate(student, 'skills', function (err, student) {
                if (err) {
                  console.log(err);
                  utils.sendErrResponse(res, 500, null);
                } else {
                  utils.sendSuccessResponse(res, student.classes);
                }
              });
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

/* Get a student's skills TODO test this
 *
 * GET /students/:studentId/skills
 * Response:
 *    - success: 200:
 *        responds with the requested student's skills
 *    - error 404:
 *        if the studentId is not valid
 */
router.get('/:studentId/skills', function (req, res) {
  Student.findById(req.params.studentId)
         .populate('skills')
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

/* Set the student input skills for a student TODO test this
 *
 * POST /students/:studentId/skills
 * Body:
 *    - skills: list of skill mongo _ids
 *              to be set as the student's skills
 * Response:
 *    - success: 200:
 *        if the skills were sucessfully set
 *    - error 404:
 *        if the studentId is not valid
 */
router.post('/:studentId/skills', function (req, res) {
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

module.exports = router;
