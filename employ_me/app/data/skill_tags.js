var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
var Skill     = require('../models/skills.js')

mongoose.connect(configDB.url);

tags = [  
    
    {name : 'Java'},
    {name : 'Javascript'},
    {name : 'Python'},
    {name : 'Software Design'},
    {name : 'Software Development'}
    // Fill out list!
    
]

Skill.collection.remove(function () {
    tags.forEach( function(skill) {
        console.log(skill.name);
        var s = new Skill(skill);
        s.save()
    });
});

