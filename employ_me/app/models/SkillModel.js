var mongoose    = require('mongoose');
var SkillSchema = require('../schemas/SkillSchema');

module.exports = mongoose.model('Skill', SkillSchema);
