var mongoose = require('mongoose');
var configDB = require('../../../config/database.js');
var bcrypt   = require('bcrypt-nodejs');

var Student  = require('../../../app/models/StudentModel.js');
var Employer = require('../../../app/models/EmployerModel.js');


mongoose.connect(configDB.url);

var testStudent = new Student();
testStudent.name     = 'Test Test';
testStudent.email    = 'test@mit.edu';
testStudent.password = testStudent.generateHash('test');
testStudent.summary  = 'I am a test student';
testStudent.website  = 'test.com';
testStudent.classes  = [];
testStudent.skills   = [];
testStudent._id      = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

testStudent.save();

var testEmployer = new Employer();
testEmployer._id        = mongoose.Types.ObjectId('4edd40c86762e0fb12111113');
testEmployer.name       = 'Test Employer';
testEmployer.email      = 'employer@test.com';
testEmployer.password   = testStudent.generateHash('test');
testEmployer.company    = 'Test Company';
testEmployer.isVerified = true;
testEmployer.listings   = [];
testEmployer._id        = mongoose.Types.ObjectId('4edd40c86762e0fb12111113');

testEmployer.save();
