var mongoose = require('mongoose');
var configDB = require('../../../config/database.js');
var Student  = require('../../../app/models/StudentModel.js');
var bcrypt   = require('bcrypt-nodejs');


mongoose.connect(configDB.url);

var testStudent = { name: 'Test Test',
                    email: 'test@mit.edu',
                    password: 'test',
                    summary: 'this is a test',
                    website: 'test.com',
                    classes: [],
                    skills: []
                  }

var testStudent = new Student();

testStudent._id      = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
testStudent.name     = 'Test Test';
testStudent.email    = 'test@mit.edu';
testStudent.password = testStudent.generateHash('test');
testStudent.summary  = 'I am a test student';
testStudent.website  = 'test.com';
testStudent.classes  = [];
testStudent.skills   = [];

testStudent.save();
