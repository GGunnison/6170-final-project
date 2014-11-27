var mongoose = require('mongoose');

// author(s): Sabrina Drammis

var ExperienceSchema = mongoose.Schema({
  comapny     : String,
  position    : String, // job position (ex: software intern)
  description : String,
  startTime   : String, // moment().format()
  endTime     : String  // moment().format()
});

module.exports = ExperienceSchema;
