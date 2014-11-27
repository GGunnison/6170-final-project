var mongoose = require('mongoose');

// author(s): Sabrina Drammis

var ListingSchema = mongoose.Schema({
  title       : String, // name of the listing
  description : String, // about the listing
  location    : String,
  skills      : [{type: String, ref:'Skill'}] // skills associated with this listing
});

module.exports = ListingSchema;
