var mongoose    = require('mongoose');
var SkillSchema = require('../schemas/SkillSchema');
var utils       = require('../utils/utils.js');

// author: Sabrina Drammis

var Skill = mongoose.model('Skill', SkillSchema);

// validators
Skill.schema.path('_id').validate(utils.checkLength, "_id cannot be empty");
Skill.schema.path('name').validate(utils.checkLength, "name cannot be empty");

module.exports = Skill;
