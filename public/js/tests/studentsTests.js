var testStudentId = '546fb461ae41e50a12de2338';
QUnit.config.reorder = false;

QUnit.begin( function () {
  $.ajax({
    type: 'POST',
    url: '/login',
    data: { email: 'test@mit.edu',
            password: 'test'
          }
  });
});

QUnit.done( function (details) {
  $.get('/logout');
});

// check that when given a valid studentId, we get the correct student back
QUnit.asyncTest( "GET /students/:studentId --valid studentId", function( assert ) {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/students/4edd40c86762e0fb12000003',
    success: function (data) {
      equal(data.content.name, 'Test Test', "correct student returned");
    }
  }).always(start);
});

// if the studentId isn't an appropriate mongoose ObjectId we should get an internal server error
QUnit.asyncTest( "GET /students/:studentId --invalid studentId", function( assert ) {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/students/1',
    error: function (res, status, data) {
      equal(res.status, 500, "Invalid ObjectId");
    }
  }).always(start);
});

// if the studentId is a mongoose ObjectId but not one in the student database then we should get a 404 not found error
QUnit.asyncTest( "GET /students/:studentId --studentId does not exist", function( assert ) {
  expect(1);
  $.ajax({
    type: 'GET',
    url: '/students/1edd40c86762e0fb12000003',
    error: function (res, status, data) {
      equal(res.status, 404, "Student does not exist");
    }
  }).always(start);
});

// add a class to the test student
QUnit.asyncTest( "PUT /students/:studentId/classes --set 6.170 as the classes for a student", function( assert ) {
  expect(1);
  $.ajax({
    type: 'PUT',
    url: '/students/4edd40c86762e0fb12000003/classes',
    data: { classes: ['6.170'] },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

// get the student's classes and test that the one we just added is there
QUnit.asyncTest( "GET /students/:studentId/classes --get classes for a student, should have 6.170", function( assert ) {
  expect(3);
  $.ajax({
    type: 'GET',
    url: '/students/4edd40c86762e0fb12000003/classes',
    success: function (data) {
      equal(data.content.length, 1, "only set 1 class for the student");
      equal(data.content[0]._id, "6.170", "6.170 is the student's only class");
      equal(data.content[0].skills[0].name, "Javascript", "class skills are populated");
    }
  }).always(start);
});

// clear the classes for a student
QUnit.asyncTest( "PUT /students/:studentId/classes --set classes as empty", function( assert ) {
  expect(3);
  $.ajax({
    type: 'PUT',
    url: '/students/4edd40c86762e0fb12000003/classes',
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).done( function () {
    $.ajax({
      type: 'GET',
      url: '/students/4edd40c86762e0fb12000003/classes',
      success: function (data, status, res) {
        equal(data.content.length, 0, "classes are set to empty");
        equal(res.status, 200, "200 status, success");
      }
    }).always(start);
  });
});

// add a skill to the test student
QUnit.asyncTest( "PUT /students/:studentId/skills --set Java as the skills for a student", function( assert ) {
  expect(1);
  $.ajax({
    type: 'PUT',
    url: '/students/4edd40c86762e0fb12000003/skills',
    data: { skills: ['1'] },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

// get the student's skill and test that the one we just added (Java) is there
QUnit.asyncTest( "GET /students/:studentId/classes --get skills for a student, should have Java", function( assert ) {
  expect(3);
  $.ajax({
    type: 'GET',
    url: '/students/4edd40c86762e0fb12000003/skills',
    success: function (data, status, res) {
      equal(data.content.length, 1, "only 1 skill was set");
      equal(data.content[0].name, "Java", "Java is the student's only skill");
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

// clear the skills for a student
QUnit.asyncTest( "PUT /students/:studentId/skills --set skills as empty", function( assert ) {
  expect(3);
  $.ajax({
    type: 'PUT',
    url: '/students/4edd40c86762e0fb12000003/skills',
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).done( function () {
    $.ajax({
      type: 'GET',
      url: '/students/4edd40c86762e0fb12000003/skills',
      success: function (data, status, res) {
        equal(data.content.length, 0, "skills are set to empty");
        equal(res.status, 200, "200 status, success");
      }
    }).always(start);
  });
});

// add an experience to the test student
QUnit.asyncTest( "POST /students/:studentId/experience --add an experience for a student", function( assert ) {
  expect(1);
  $.ajax({
    type: 'POST',
    url: '/students/4edd40c86762e0fb12000003/experience',
    data: { experience : { company     : "Test Company",
                           position    : "Software Developer",
                           description : "a lot of work",
                           startTime   : "2014-11-28T22:31:10-05:00",
                           endTime     : "2014-11-28T22:31:10-05:00"
                         }
          },
    success: function (data, status, res) {
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

var experienceId = null;

// get the student's experience and ensure the one we added is there
QUnit.asyncTest( "GET /students/:studentId/experience --get experience for a student", function( assert ) {
  expect(3);
  $.ajax({
    type: 'GET',
    url: '/students/4edd40c86762e0fb12000003/experience',
    success: function (data, status, res) {
      experienceId = data.content[0]._id;
      equal(data.content.length, 1, "only 1 experience set");
      equal(data.content[0].company, "Test Company", "Experience is set correctly");
      equal(res.status, 200, "200 status, success");
    }
  }).always(start);
});

// update a specific experience
QUnit.asyncTest( "PUT /students/:studentId/experience/:experienceId --update specific experience for a student", function( assert ) {
  expect(3);
  $.ajax({
    type: 'PUT',
    url: '/students/4edd40c86762e0fb12000003/experience/' + experienceId,
    data: { experience : { company     : "Test Company Updated",
                           position    : "Software Developer",
                           description : "a lot of work",
                           startTime   : "2014-11-28T22:31:10-05:00",
                           endTime     : "2014-11-28T22:31:10-05:00"
                         }
          },
    success: function (data, status, res) {
      $.get('/students/4edd40c86762e0fb12000003/experience', function (data) {
        equal(data.content.length, 1, "only 1 experience");
        equal(data.content[0].company, "Test Company Updated", "Experience was updated correctly");
        equal(res.status, 200, "200 status, success");
      }).always(start);
    }
  });
});

// delete a specific experience
QUnit.asyncTest( "DELETE /students/:studentId/experience/:experienceId --delete specific experience for a student", function( assert ) {
  expect(1);
  $.ajax({
    type: 'DELETE',
    url: '/students/4edd40c86762e0fb12000003/experience/' + experienceId,
    success: function (data, status, res) {
      $.get('/students/4edd40c86762e0fb12000003/experience', function (data) {
        equal(data.content.length, 0, "only 0 experience");
      }).always(start);
    }
  });
});
