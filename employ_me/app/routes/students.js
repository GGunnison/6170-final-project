var router = require('express').Router();
var utils  = require('../utils/utils.js');

// database models
var Student = require('../models/StudentModel');
var Class   = require('../models/ClassModel');
var Skill   = require('../models/SkillModel');

/* Search for students
 *
 */
router.get('/', function (req, res) {
  Student.find({}, function (err, students) {
    res.render('employerSearchResults', {students: students});
    //utils.sendSuccessResponse(res, students);
  });
});

/* Get a specified student.
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
  Student.findById(req.params.studentId)
         .populate('skills')
         .populate('classes')
         .exec( function (err, student) {
            if (err) {
              console.log(err);
              utils.sendErrResponse(res, 500, null);
            } else if (student) {
              var opts = { path: 'classes.skills',
                           select: 'name',
                           model: Skill
                         }
              Class.populate(student, opts, function (err, doc) {
                if (err) {
                  utils.sendErrResponse(res, 500, null);
                } else {
                  utils.sendSuccessResponse(res, student);
                }
              });
            } else {
              utils.sendErrResponse(res, 404, 'student was not found');
            }
         });
});

/* Get a student's classes
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
              var opts = { path: 'classes.skills',
                           select: 'name',
                           model: Skill
                         }
              Class.populate(student, opts, function (err, doc) {
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

/* Set the classes for a student
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
  Student.findByIdAndUpdate(req.params.studentId,
         {classes: req.body.classes},
         function (err, student) {
           if (err) {
             console.log("error at /:studentId/classes", err);
             utils.sendErrResponse(res, 500, null);
           } else if (student) {
             utils.sendSuccessResponse(res, null);
           } else {
             utils.sendErrResponse(res, 404, 'student was not found');
           }
         });
});

/* Get a student's skills
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
              console.log("error at /:studentId/skills", err);
              utils.sendErrResponse(res, 500, null);
            } else if (student) {
              console.log(student);
              utils.sendSuccessResponse(res, student.skills);
            } else {
              utils.sendErrResponse(res, 404, 'student was not found');
            }
         });
});

/* Set the student input skills for a student
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
  Student.findByIdAndUpdate(req.params.studentId,
         {skills: req.body.skills},
         function (err, student) {
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

/* POST /students/search
 * Body:
 *   - tags: a list of tags
 *
 * Response:
 *
 * Test:
 *   curl --data "desiredSkills[]=java&desiredSkills[]=testing&requiredSkills[]=c" localhost:3000/students/search
 *
 */
router.post('/search', function(req, res) {
  var requiredSkills = req.body.requiredSkills;
  var desiredSkills = req.body.desiredSkills;

  if (requiredSkills == undefined) {
    utils.sendErrResponse(res, 500, null);
  }

  // Looking for a way to improve this. Currently, it queries for the
  // whole database, and filters afterward. We do this because we want
  // to get every student with at least one Skill in the required skills,
  // or one Class Skill in the required skills. I was unable to figure out
  // a way to write a mongo query to accomplish this.
  //
  //.find({ $or: [ { skills: { $in: requiredSkills }},
  //               { at least one class has a skill that is in requiredSkills }
  //     ]})
  Student.find({}).exec(function(err, students) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);

    } else {
      students = students.filter(function(student) {
        for (tag in requiredSkills) {
          // Skills
          var skills = student.skills;
          for (var i = 0; i < skills.length; i++) {
            if (tag == skills[i]) {
              return true;
            }
          }

          // Classes
          var classes = student.classes;
          for (var i = 0; i < classes.length; i++) {
            stuClass = classes[i];
            for (var j = 0; j < stuClass.length; j++) {
              if (tag == stuClass[j]) {
                return true;
              }
            }
          }
        }
        return false;
      });

      res.render('employerSearchResults', {students: students});
    }
  });
});


module.exports = router;
