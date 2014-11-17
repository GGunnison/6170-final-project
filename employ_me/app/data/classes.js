var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
var Class    = require('../models/ClassModel.js')

mongoose.connect(configDB.url);

classes =  [

  { name   : 'Introduction to EECS 1',
    _id    : '6.01',
    skills : ["2"]
  }

]

Class.collection.remove( function () {
  classes.forEach( function (klass) {
    var c = new Class(klass);
    c.save();
  });
});
