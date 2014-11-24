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

    //Random Knowledge

    { _id  : "23",
      name : 'Graph Theory'},

    { _id  : "24",
      name : 'Dynamic Programming'},

    { _id  : "25",
      name : 'Signal Filtering'},

    { _id  : "26",
      name : 'Amplification'},

    { _id  : "27",
      name : 'Fourier Transforms'},

    { _id  : "28",
      name : 'Laplace Transforms'},

    { _id  : "29",
      name : 'Z Transforms'},

    { _id  : "30",
      name : 'Linear Algebra'},

    { _id  : "31",
      name : 'Differential Equations'},

    { _id  : "32",
      name : 'Boolean Algebra'},

    { _id  : "33",
      name : 'Digital Systems'},

    { _id  : "34",
      name : 'Machine Code'},

    { _id  : "35",
      name : 'Neural Nets'},

    { _id  : "36",
      name : 'Support Vector Machines'},

    { _id  : "37",
      name : 'Identification Trees'},

    { _id  : "38",
      name : 'Search'},

    { _id  : "39",
      name : 'Rule Based Systems'},

    { _id  : "40",
      name : 'Constraint Satisfaction Problems'},

    { _id  : "41",
      name : 'Number Theory'},

    { _id  : "42",
      name : 'Hashing'},

    { _id  : "43",
      name : 'Computational Geometry'},
 
    { _id  : "44",
      name : 'Parallel Computing'},

    { _id  : "45",
      name : 'Caching'},

    { _id  : "46",
      name : 'Cache and Memory Optimization'},

    { _id  : "47",
      name : 'Instruction-level Optimization'},

    { _id  : "48",
      name : 'Performance Analysis'},

    { _id  : "49",
      name : 'Recovery'},

    { _id  : "50",
      name : 'Query Optimization'},

    { _id  : "51",
      name : 'Concurrency Control'},

    { _id  : "52",
      name : 'Performance Analysis'},

    { _id  : "53",
      name : 'Parallel and Adaptive Databases'},

    { _id  : "54",
      name : 'Cryptography Protocols'},

    { _id  : "55",
      name : 'Sandboxing'},

    { _id  : "56",
      name : 'Web Security'},

    { _id  : "57",
      name : 'Mobile Security'},

    { _id  : "58",
      name : 'Transport Protocols'},

    { _id  : "59",
      name : 'Routing Foundations'},

    { _id  : "60",
      name : 'Network Resource Management'},

    { _id  : "61",
      name : 'Router Design'},

    






    
     






    // Fill out list!

]

Skill.collection.remove(function () {
    tags.forEach( function(skill) {
        console.log(skill.name);
        var s = new Skill(skill);
        s.save();
    });
});
