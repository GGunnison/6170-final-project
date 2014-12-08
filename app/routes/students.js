// author(s): Sabrian Drammis, Samuel Edson
var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');
var async    = require('async');

// database models
var Student = require('../models/StudentModel');
var Class   = require('../models/ClassModel');
var Skill   = require('../models/SkillModel');

router.get('/foo', function(req, res) {
  Student.find({})
         .populate('skills')
         .exec( function(err, students) {
           async.each(students, function(student, cb) {
             student.deepPopulate('classes.skills', function (err) {
               if (err) console.log(err);
               console.log(student);
              cb();
             });
           }, function(err) {
             res.send(students)
           });
         });
});

/* Filter and order students based off of desired and require skills
 *
 * Only Employers can hit this route.
 *
 * GET /students
 *
 * Body:
 *   - requiredSkills: a list of Tag _ids
 *                     skills that a student must contain
 *   - desiredSkills:  a list of Tag _ids
 *                     skills that a company would like a student to have
 *
 * Response:
 *   - success 200
 *        responds with a list of ordered studends
 *
 * author: Samuel Edson
 */
router.get('/', utils.isLoggedInEmployer, function(req, res) {
  var requiredSkills = req.query.requiredSkills || [];
  var desiredSkills  = req.query.desiredSkills || [];

  Student.find({})
  .populate('skills')
  .exec(function(err, students) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {

      // return all if no filter specified
      if (requiredSkills.length === 0 && desiredSkills.length === 0) {
        utils.sendSuccessResponse(res, students);
      // go thorugh the filtering process
      } else {
        async.each(students, function(student, cb) {
          student.deepPopulate('classes.skills', function (err) {
            if (err) console.log(err);
            console.log(student);
           cb();
          });
        }, function (err) {
          // Keeps track of each student's score so the we can sort them later
          scores = {};

          // Remove all students that do not have at least one requiredSkill
          // in his/her skills or any classes' skills
          students = students.filter( function(student) {
            var score = 0;
            // Required
            for (var idx = 0; idx < requiredSkills.length; idx++) {
              var tag = requiredSkills[idx];

              // Skills
              var skills = student.skills;
              for (var i = 0; i < skills.length; i++) {
                if (tag === skills[i]._id) score += 1;
              }

              // Classes
              for (var i = 0; i < student.classes.length; i++) {
                var c = student.classes[i];
                Class.findById(c, function (err, klass) {
                  for (var j = 0; j < klass.skills.length; j++) {
                    if (klass.skills[j]._id === tag) score += 1;
                  }
                });
              }
            }

            // Only keep it if there was at least one match in the required
            // skills
            var keep = (score !== 0);

            // Desired
            for (var idx = 0; idx < desiredSkills.length; idx++) {
              var tag = desiredSkills[idx];

              // Skills
              var skills = student.skills;
              for (var i = 0; i < skills.length; i++) {
                if (tag === skills[i]._id) score += 1;
              }

              // Classes
              for (var i = 0; i < student.classes.length; i++) {
                var c = student.classes[i];
                Class.findById(c, function (err, klass) {
                  for (var j = 0; j < klass.skills.length; j++) {
                    if (klass.skills[j]._id === tag) score += 1;
                  }
                });
              }
            }

            if (keep) scores[student._id] = score;
            return keep;
          });

          // Sort by the most matches
          students.sort(function(x, y) {
            return scores[x._id] < scores[y._id];
          });

          // Respond
          utils.sendSuccessResponse(res, students);
        });
      }
    }
  });
});

/* Get a specified student.
 * Must be logged in.
 *
 * GET /students/:studentId
 *
 * Params:
 *    - studentId:
 *        _id of the desired student
 *
 * Response:
 *    - success 200
 *        responds with the requested student
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId', utils.isLoggedIn, function (req, res) {
    Student.findById(req.params.studentId)
           .populate('skills')
           .exec( function (err, student) {
              if (err) {
                console.log(err);
                utils.sendErrResponse(res, 500, err);
              } else if (student) {
                student.deepPopulate('classes.skills', function (err) {
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
 * Must be logged in.
 *
 * GET /students/:studentId/classes
 *
 * Params:
 *    - studentId:
 *        _id of student whose classes to get
 *
 * Response:
 *    - success: 200:
 *        responds with the requested student's classes
 *        classes contain the skills assocaited with them
 *    - error 404:
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId/classes', utils.isLoggedIn, function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else if (student) {
      student.deepPopulate('classes.skills', function (err) {
        if (err) {
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

/* Set the classes for a student.
 * Only allowed to set your own classes.
 *
 * PUT /students/:studentId/classes
 *
 * Params:
 *    - studentId:
 *        _id of student to set classes for
 *        must be the logged in student's _id
 *
 * Body:
 *    - classes: list of class mongo _ids
 *               set as the student's classes
 * Response:
 *    - success 200
 *        if the classes were sucessfully set
 *    - error 403
 *        if the user making the request is not the logged in student
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.put('/:studentId/classes', utils.isLoggedInStudent, function (req, res) {
  if (req.user._id.toString() === req.params.studentId) {
    var classes = req.body.classes || [];
    Student.findByIdAndUpdate(req.params.studentId,
           {classes: classes},
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
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

/* Get a student's skills
 * Must be logged in.
 *
 * GET /students/:studentId/skills
 *
 * Params:
 *    - studentId:
 *        _id of student whose skills to get
 *
 * Response:
 *    - success 200
 *        responds with the requested student's skills
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId/skills', utils.isLoggedIn, function (req, res) {
  Student.findById(req.params.studentId)
         .populate('skills')
         .exec( function (err, student) {
            if (err) {
              console.log("error at GET /students/:studentId/skills", err);
              utils.sendErrResponse(res, 500, null);
            } else if (student) {
              utils.sendSuccessResponse(res, student.skills);
            } else {
              utils.sendErrResponse(res, 404, 'student was not found');
            }
         });
});

/* Set the student input skills for a student.
 * A student can only edit their own information.
 *
 * PUT /students/:studentId/skills
 *
 * Params:
 *    - studentId:
 *        _id of student to set skills for
 *        must be the logged in student's _id
 *
 * Body:
 *    - skills: list of skill mongo _ids
 *              to be set as the student's skills
 *
 * Response:
 *    - success 200
 *        if the skills were sucessfully set
 *    - error 403
 *        if the user making the request is not the logged in student
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.put('/:studentId/skills', utils.isLoggedInStudent, function (req, res) {
  if (req.user._id.toString() === req.params.studentId) {
    var skills = req.body.skills || [];
    Student.findByIdAndUpdate(req.params.studentId,
           {skills: skills},
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
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other \
                                     users' information");
  }
});


/* Get all of the student's experience
 *
 * GET /students/:studentId/experience
 *
 * Params:
 *    - studentId:
 *        _id of student to set experiences for
 *        must be the logged in student's _id
 * Body:
 *    - experience: ExperinceSchema object
 *        { company: String,
 *          position: String,
 *          description: String,
 *          startTime: String,  -- moment().format()
 *          endTime: String,    -- moment().format()
 *        }
 *
 * Response:
 *    - success 200
 *        responds with specified student's experience
 *    - error 404
 *        if the id given does not match a student
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId/experience', utils.isLoggedIn, function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else if (student) {
      utils.sendSuccessResponse(res, student.experience);
    } else {
      utils.sendErrResponse(res, 404, 'student was not found');
    }
  });
});

/* Add a new experience.
 * A student can only edit their own information.
 *
 * POST /students/:studentId/experience
 *
 * Params:
 *    - studentId:
 *        _id of student to add experience to
 *        must be the logged in student's _id
 *
 * Body:
 *    - experience: ExperinceSchema object
 *        { company: String,
 *          position: String,
 *          description: String,
 *          startTime: String,  -- moment().format()
 *          endTime: String,    -- moment().format()
 *        }
 *
 * Response:
 *    - success 200
 *        if the experience was successfully added
 *    - error 403
 *        if the user making the request is not the logged in student
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.post('/:studentId/experience', utils.isLoggedInStudent, function (req, res) {
  if (req.user._id.toString() === req.params.studentId) {
    Student.findByIdAndUpdate(
      req.params.studentId,
      {$push: {experience: req.body.experience}},
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
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

/* Replace/update a specific experience
 * A student can only edit their own information.
 *
 * PUT /students/:studentId/experience/:experienceId
 *
 * Params:
 *    - studentId:
 *        _id of student to update experience for
 *        must be the logged in student's _id
 *    - experienceId:
 *        _id of the experience to be updated/replaced
 *
 * Body:
 *    - experience: ExperinceSchema object
 *        { company: String,
 *          position: String,
 *          description: String,
 *          startTime: String,  -- moment().format()
 *          endTime: String,    -- moment().format()
 *        }
 *
 * Response:
 *    - success 200
 *        if the skills were sucessfully set
 *    - error 403
 *        if the user making the request is not the logged in student
 *    - error 404
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.put('/:studentId/experience/:experienceId', utils.isLoggedInStudent, function (req, res) {
  if (req.user._id.toString() === req.params.studentId) {
    var set = req.body.experience;
    set._id = mongoose.Types.ObjectId(req.params.experienceId);
    Student.update({_id: req.params.studentId, "experience._id" : req.params.experienceId},
                   { $set: { "experience.$" : req.body.experience } },
                   function (err, success) {
                     if (success) {
                       utils.sendSuccessResponse(res, null);
                     } else {
                       if (err) console.log(err);
                       utils.sendErrResponse(res, 500, null);
                     }
                   });
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

/* Remove a specific experience
 *
 * DELETE /students/:studentId/experience/:experienceId
 *
 * Params:
 *    - studentId:
 *        _id of student to delete experience for
 *        must be the logged in student's _id
 *    - experienceId:
 *        _id of the experience to be deleted
 *
 * Response:
 *    - success 200
 *        if the experience was successfully deleted
 *    - error 403
 *        if the user making the request is not the logged in student
 *
 * author: Sabrina Drammis
 */
router.delete('/:studentId/experience/:experienceId', utils.isLoggedInStudent, function (req, res) {
  if (req.user._id.toString() === req.params.studentId) {
    Student.update({_id : req.params.studentId},
                   { $pull : { 'experience' : { '_id' : req.params.experienceId }}},
                   function (err, success) {
                     if (success) {
                       utils.sendSuccessResponse(res, null);
                     } else {
                       if (err) console.log(err);
                       utils.sendErrResponse(res, 500, null);
                     }
                   });
  } else {
    utils.sendErrResponse(res, 403, "you are not allowed to modify other users' information");
  }
});

module.exports = router;
