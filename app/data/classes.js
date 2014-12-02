var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
var Class    = require('../models/ClassModel.js')

console.log("configDB url: ", configDB.url);
mongoose.connect(configDB.url);

// authors: Sabrina Drammis, Grant Gunnison
classes =  [

  { name   : 'Introduction to EECS 1',
    _id    : '6.01',
    skills : ["2"]
  },
  { name   : 'Circuit Design',
    _id    : '6.002',
    skills : ["16", "25", "26", "31", "33"]
  },
  { name   : 'Signals and Systems',
    _id    : '6.003',
    skills : ["27", "28", "29", "30"]
  },
  { name   : 'Computational Structures',
    _id    : '6.004',
    skills : ["32", "33", "34", "35", "45"]
  },
  { name   : 'Software Studio',
    _id    : '6.005',
    skills : ["1", "9", "10", "12"]
  },
  { name   : 'Algorithms',
    _id    : '6.006',
    skills : ["2", "11", "23", "24", "38", "41", "42"]
  },
  { name   : 'Artificial Intelligence',
    _id    : '6.034',
    skills : ["2", "36", "37", "38", "39", "40"]
  },
  { name   : 'Advanced Algorithms',
    _id    : '6.046',
    skills : ["38", "41", "24", "43", "44", "45"]
  },
  { name   : 'Software Studio',
    _id    : '6.170',
    skills : ["3", "4", "12", "13", "14", "15"]
  },
  { name   : 'Performance Engineering',
    _id    : '6.172',
    skills : ["5", "46", "47", "48"]
  },
  { name   : 'Database Systems',
    _id    : '6.830',
    skills : ["5", "49", "50", "51", "52", "53"]
  },
  { name   : 'System Security',
    _id    : '6.858',
    skills : ["2", "54", "55", "56", "57"]
  },
  { name   : 'Computer Networks',
    _id    : '6.829',
    skills : ["2", "58", "59", "60", "61"]
  }
]

Class.collection.remove( function () {
  classes.forEach( function (klass) {
    var c = new Class(klass);
    c.save();
  });
});
