var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
var Skill     = require('../models/SkillModel.js')

mongoose.connect(configDB.url);

// authors: Sabrina Drammis, Grant Gunnison
tags = [

    //Languages
    { _id  : "1",
      name : 'Java'},
    { _id  : "2",
      name : "Python"},
    { _id  : "3",
      name : 'Javascript'},
    { _id  : "4",
      name : 'HTML/CSS'},
    { _id  : "5",
      name : 'C/C++'},
    { _id  : "6",
      name : 'iOS'},
    { _id  : "7",
      name : 'Android'},
    { _id  : "8",
      name : 'SQL'},

    //6.005
    { _id  : "9",
      name : 'Software Development'},
    { _id  : "10",
      name : "Concurrency"},
    //6.006
    { _id  : "11",
      name : "Algorithms"},
    //6.170

    { _id  : "12",
      name : 'Software Design'},
    { _id  : "13",
      name : 'Software Development'},
    { _id  : "14",
      name : 'Web Design'},
    { _id  : "15",
      name : 'MongoDB'},
    //6.002
    { _id  : "16",
      name : 'Circuit Design'},
    //6.003
    { _id  : "17",
      name : 'Control Theory'},
    //6.004
    { _id  : "18",
      name : 'Computational Structures'},
    //6.858
    { _id  : "19",
      name : 'Security'},
    //6.034
    { _id  : "20",
      name : 'Artificial Intelligence'},
    //6.036
    { _id  : "21",
      name : 'Machine Learning'},

    //Extra Skills

    { _id  : "22",
      name : 'Computer Vision'},






    // Fill out list!

]

Skill.collection.remove(function () {
    tags.forEach( function(skill) {
        console.log(skill.name);
        var s = new Skill(skill);
        s.save();
    });
});
