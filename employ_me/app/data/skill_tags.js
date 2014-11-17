var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
var Skill     = require('../models/SkillModel.js')

mongoose.connect(configDB.url);

tags = [

    { _id  : "1",
      name : 'Java'},
    { _id  : "2",
      name : 'Javascript'},
    { _id  : "3",
      name : 'Python'},
    { _id  : "4",
      name : 'Software Design'},
    { _id  : "5",
      name : 'Software Development'}
    // Fill out list!

]

Skill.collection.remove(function () {
    tags.forEach( function(skill) {
        console.log(skill.name);
        var s = new Skill(skill);
        s.save();
    });
});
