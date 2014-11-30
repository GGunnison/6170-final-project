// Authors: Sabrian Drammis, Samuel Edson
var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

// database models
var Student = require('../models/StudentModel');
var Class   = require('../models/ClassModel');
var Skill   = require('../models/SkillModel');

/* Search for students
 * TODO integrate this route with the search functionality
 */
router.get('/', function (req, res) {
  Student.find({}, function (err, students) {
    res.render('employerSearchResults', {students: students});
  });
});

/* Get a specified student.
 *
 * GET /students/:studentId
 *
 * Params:
 *    - studentId:
 *        _id of the desired student
 *
 * Response:
 *    - success: 200:
 *        responds with the requested student
 *    - error 404:
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId', function (req, res) {
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
router.get('/:studentId/classes', function (req, res) {
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

/* Set the classes for a student
 *
 * PUT /students/:studentId/classes
 *
 * Params:
 *    - studentId:
 *        _id of student to set classes for
 *
 * Body:
 *    - classes: list of class mongo _ids
 *               set as the student's classes
 * Response:
 *    - success: 200:
 *        if the classes were sucessfully set
 *    - error 404:
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.put('/:studentId/classes', function (req, res) {
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
});

/* Get a student's skills
 *
 * GET /students/:studentId/skills
 *
 * Params:
 *    - studentId:
 *        _id of student whose skills to get
 *
 * Response:
 *    - success: 200:
 *        responds with the requested student's skills
 *    - error 404:
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.get('/:studentId/skills', function (req, res) {
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

/* Set the student input skills for a student
 *
 * PUT /students/:studentId/skills
 *
 * Params:
 *    - studentId:
 *        _id of student to set skills for
 *
 * Body:
 *    - skills: list of skill mongo _ids
 *              to be set as the student's skills
 * Response:
 *    - success: 200:
 *        if the skills were sucessfully set
 *    - error 404:
 *        if the studentId is not valid
 *
 * author: Sabrina Drammis
 */
router.put('/:studentId/skills', function (req, res) {
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
});


/* Get all of the student's experience
 *
 * GET /students/:studentId/experience
 *
 * Body:
 *    - experience: ExperinceSchema object
 *        { company: String,
 *          position: String,
 *          description: String,
 *          startTime: String,  -- moment().format()
 *          endTime: String,    -- moment().format()
 *        }
 * Response:
 *    - success 200
 *        responds with specified student's experience
 *    - error 404
 *        if the id given does not match a student
 */
router.get('/:studentId/experience', function (req, res) {
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

/* Add a new experience
 *
 * POST /students/:studentId/experience
 *
 * TODO write the spec
 */
router.post('/:studentId/experience', function (req, res) {
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
});

/* Update a specific experience
 *
 * PUT /students/:studentId/experience/:experienceId
 *
 * TODO write spec
 */
router.put('/:studentId/experience/:experienceId', function (req, res) {
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
});

/* Remove a specific experience
 *
 * DELETE /students/:studentId/experience/:experienceId
 *
 * TODO write spec
 *
 */
router.delete('/:studentId/experience/:experienceId', function (req, res) {
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
});

/* Redirect to a page with every student that has at least
 * one of the required skills in his/her skills or any classes'
 * skills.
 *
 * POST /students/search
 *
 * Body:
 *   - requiredSkills: a list of Tag _ids
 *   - desiredSkills: a list of Tag _ids
 *
 * Response:
 *   - success: 200:
 *       if the search worked and renders a results page
 *
 * author: Sam Edson, Sabrina Drammis
 * TODO clean this code up
 */
router.post('/search', function(req, res) {
  var requiredSkills = req.body.requiredSkills || [];
  var desiredSkills  = req.body.desiredSkills || [];

  // TODO: Looking for a way to improve this. Currently, it queries for the
  // whole database, and filters afterward. We do this because we want
  // to get every student with at least one Skill in the required skills,
  // or one Class Skill in the required skills. I was unable to figure out
  // a way to write a mongo query to accomplish this.
  //
  //.find({ $or: [ { skills: { $in: requiredSkills }},
  //               { at least one class has a skill in requiredSkills }
  //     ]})
  Student.find({}).exec(function(err, students) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, null);
    } else {
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
            if (tag === skills[i]) score += 1;
          }

          // Classes
          for (var i = 0; i < student.classes.length; i++) {
            var c = student.classes[i];
            Class.findById(c, function (err, klass) {
              for (var j = 0; j < klass.skills.length; j++) {
                if (klass.skills[j] === tag) score += 1;
              }
            });
          }
        }

        // Only keep it if there was at least one match in the required
        // skills
        var keep = (score != 0);

        // Desired
        for (var idx = 0; idx < desiredSkills.length; idx++) {
          var tag = desiredSkills[idx];

          // Skills
          var skills = student.skills;
          for (var i = 0; i < skills.length; i++) {
            if (tag === skills[i]) score += 1;
          }

          // Classes
          for (var i = 0; i < student.classes.length; i++) {
            var c = student.classes[i];
            Class.findById(c, function (err, klass) {
              for (var j = 0; j < klass.skills.length; j++) {
                if (klass.skills[j] === tag) score += 1;
              }
            });
          }
        }

        scores[student.name] = score;
        return keep;
      });

      students.sort(function(x, y) {
        return scores[x] > scores[y];
      });

      res.render('employerSearchResults', { students: students });
    }
  });
});


module.exports = router;
