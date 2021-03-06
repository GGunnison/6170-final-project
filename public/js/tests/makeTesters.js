var mongoose = require('mongoose');
var configDB = require('../../../config/database.js');
var bcrypt   = require('bcrypt-nodejs');

var Student  = require('../../../app/models/StudentModel.js');
var Employer = require('../../../app/models/EmployerModel.js');
var Skill    = require('../../../app/models/SkillModel.js');
var Listing  = require('../../../app/models/ListingModel.js');

mongoose.connect(configDB.url);

var testEmployer = new Employer();
testEmployer.name       = 'Test Employer';
testEmployer.email      = 'employer@test.com';
testEmployer.password   = testEmployer.generateHash('test');
testEmployer.company    = 'Test Company';
testEmployer.isVerified = true;
testEmployer.listings   = [];
testEmployer.mailbox  = {

			inbox : [],
			sentbox : []
}
testEmployer._id        = mongoose.Types.ObjectId('4edd40c86762e0fb12111113');
testEmployer.save();

var testStudent = new Student();
testStudent.name     = 'Test Test';
testStudent.email    = 'test@mit.edu';
testStudent.password = testStudent.generateHash('test');
testStudent.summary  = 'I am a test student';
testStudent.website  = 'test.com';
testStudent.classes  = [];
testStudent.skills   = [];
testEmployer.mailbox  = {

			inbox : [],
			sentbox : []
}
testStudent._id      = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
testStudent.save();
