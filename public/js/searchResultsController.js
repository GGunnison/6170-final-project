!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.main=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var SearchResultsController = function() {

  // Public variables, available outside controller
  var public = {
    filter: function () {
      console.log('filtering');

      var requiredSkills = [];
      var desiredSkills  = [];

      $(".requiredSkillsDrop .skill span").each(function(i) {
        var skill_id = $(this).attr("id");
        requiredSkills.push(skill_id);
      });

      $(".desiredSkillsDrop .skill span").each(function(i) {
        var skill_id = $(this).attr("id");
        desiredSkills.push(skill_id);
      });

      var data = {
        requiredSkills: requiredSkills,
        desiredSkills: desiredSkills,
        _csrf: public.csrf
      }

      var ajaxObj = {
        datatype: "json",
        type: "GET",
        data: data
      }

      console.log($('#userType').val());

      var searchType = null;
      if ($('#userType').val() === "Student") {
        ajaxObj["url"] = "/employers";
        searchType = 'employers';
      } else if ($('#userType').val() === "Employer") {
        ajaxObj["url"] = "/students";
        searchType = 'students';
      }
      console.log(ajaxObj);

      $.ajax(ajaxObj).done(function(res) {
        console.log('response', res);
        switch (searchType) {
          case 'employers':
            helpers.renderListings(res.content);
            break;
          case 'students':
            console.log(res.content);
            helpers.renderStudents(res.content);
            break;
        }
      });
    }
  };

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.studentsTemplate = require('../../views/templates/search/students.jade');
    local.listingsTemplate = require('../../views/templates/search/employerListings.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderListings = function (listings) {
      var listings     = listings || [];
      var listingsHTML = local.listingsTemplate({listings: listings});
      console.log('render them');
      $('#results').html(listingsHTML);
    }

    exports.renderStudents = function (students) {
      var students     = students || [];
      var studentsHTML = local.studentsTemplate({students: students});
      $('#results').html(studentsHTML);
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    // populate with all students/listings
    public.filter();
  }

  var eventListeners = function() {
      $("#skillSubmit").on("click", function() {
        public.filter();
      });

      $(document).on('click', '.panel-body', function() {
        $(this).children('.rest').slideToggle();
      });
  }

  return {
    public: public,
    init: init
  }
}

searchResultsController = new SearchResultsController();
$(document).ready(function() {
  searchResultsController.init();
});

},{"../../views/templates/search/employerListings.jade":4,"../../views/templates/search/students.jade":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":2}],4:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (listings) {
jade_mixins["listing"] = function(listing){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"panel panel-default\"><div class=\"panel-body\"><div id=\"id\" style=\"display:none;\">" + (jade.escape(null == (jade_interp = listing._id) ? "" : jade_interp)) + "</div><div class=\"row\"><div class=\"col-md-6\"><h4><strong>" + (jade.escape(null == (jade_interp = listing.title) ? "" : jade_interp)) + "</strong></h4><h5>" + (jade.escape(null == (jade_interp = listing.company) ? "" : jade_interp)) + "</h5><h5>" + (jade.escape(null == (jade_interp = listing.position) ? "" : jade_interp)) + "</h5><h5>" + (jade.escape(null == (jade_interp = listing.location          ) ? "" : jade_interp)) + "</h5></div><div class=\"col-md-6\"><h3><strong>Skills</strong></h3>");
// iterate listing.skills
;(function(){
  var $$obj = listing.skills;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  }
}).call(this);

buf.push("</div></div><div style=\"display: none;\" class=\"row rest\"><div class=\"col-md-12\"><h4><strong>Description</strong></h4><div>" + (jade.escape(null == (jade_interp = listing.employerName) ? "" : jade_interp)) + "</div><a" + (jade.attr("href", "mailto:" + (listing.email) + "", true, false)) + ">" + (jade.escape(null == (jade_interp = listing.email) ? "" : jade_interp)) + "</a><br/><p>" + (jade.escape(null == (jade_interp = listing.description) ? "" : jade_interp)) + "</p></div></div></div></div>");
};
buf.push("<p>listing</p>");
// iterate listings
;(function(){
  var $$obj = listings;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var listing = $$obj[$index];

jade_mixins["listing"](listing);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var listing = $$obj[$index];

jade_mixins["listing"](listing);
    }

  }
}).call(this);
}.call(this,"listings" in locals_for_with?locals_for_with.listings:typeof listings!=="undefined"?listings:undefined));;return buf.join("");
};
},{"jade/runtime":3}],5:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (students) {
jade_mixins["experience"] = function(experience){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<h4>experience.company</h4><h5>experience.position</h5><h6 style=\"margin: 10px 0px\">experience.description</h6>");
};
jade_mixins["student"] = function(student){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"panel panel-default student\"><div class=\"panel-body\"><div id=\"id\" style=\"display:none\">" + (jade.escape(null == (jade_interp = student._id) ? "" : jade_interp)) + "</div><div class=\"row\"><div class=\"col-md-6\"><h4><strong>" + (jade.escape(null == (jade_interp = student.name) ? "" : jade_interp)) + "</strong></h4><h5>" + (jade.escape(null == (jade_interp = student.email) ? "" : jade_interp)) + "</h5><h6>summary of my life goes here yay</h6></div><div class=\"col-md-6\"><h3><strong>Skills</strong></h3>");
// iterate student.skills
;(function(){
  var $$obj = student.skills;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var skill = $$obj[$index];

buf.push("<span class=\"label label-primary\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<span class=\"label label-primary\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  }
}).call(this);

// iterate student.classes
;(function(){
  var $$obj = student.classes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var klass = $$obj[$index];

// iterate klass.skills
;(function(){
  var $$obj = klass.skills;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var klass = $$obj[$index];

// iterate klass.skills
;(function(){
  var $$obj = klass.skills;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div></div><div style=\"display: none;\" class=\"row rest\"><div class=\"col-md-12\"><h3><strong>Experiences");
jade_mixins["experience"]();
buf.push("</strong></h3></div></div></div></div>");
};
// iterate students
;(function(){
  var $$obj = students;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var student = $$obj[$index];

jade_mixins["student"](student);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var student = $$obj[$index];

jade_mixins["student"](student);
    }

  }
}).call(this);
}.call(this,"students" in locals_for_with?locals_for_with.students:typeof students!=="undefined"?students:undefined));;return buf.join("");
};
},{"jade/runtime":3}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL3NlYXJjaFJlc3VsdHNDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvc2VhcmNoL2VtcGxveWVyTGlzdGluZ3MuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvc3R1ZGVudHMuamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgU2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXG4gIHZhciBwdWJsaWMgPSB7XG4gICAgZmlsdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZmlsdGVyaW5nJyk7XG5cbiAgICAgIHZhciByZXF1aXJlZFNraWxscyA9IFtdO1xuICAgICAgdmFyIGRlc2lyZWRTa2lsbHMgID0gW107XG5cbiAgICAgICQoXCIucmVxdWlyZWRTa2lsbHNEcm9wIC5za2lsbCBzcGFuXCIpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgc2tpbGxfaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgcmVxdWlyZWRTa2lsbHMucHVzaChza2lsbF9pZCk7XG4gICAgICB9KTtcblxuICAgICAgJChcIi5kZXNpcmVkU2tpbGxzRHJvcCAuc2tpbGwgc3BhblwiKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIHNraWxsX2lkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIGRlc2lyZWRTa2lsbHMucHVzaChza2lsbF9pZCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlcXVpcmVkU2tpbGxzOiByZXF1aXJlZFNraWxscyxcbiAgICAgICAgZGVzaXJlZFNraWxsczogZGVzaXJlZFNraWxscyxcbiAgICAgICAgX2NzcmY6IHB1YmxpYy5jc3JmXG4gICAgICB9XG5cbiAgICAgIHZhciBhamF4T2JqID0ge1xuICAgICAgICBkYXRhdHlwZTogXCJqc29uXCIsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJCgnI3VzZXJUeXBlJykudmFsKCkpO1xuXG4gICAgICB2YXIgc2VhcmNoVHlwZSA9IG51bGw7XG4gICAgICBpZiAoJCgnI3VzZXJUeXBlJykudmFsKCkgPT09IFwiU3R1ZGVudFwiKSB7XG4gICAgICAgIGFqYXhPYmpbXCJ1cmxcIl0gPSBcIi9lbXBsb3llcnNcIjtcbiAgICAgICAgc2VhcmNoVHlwZSA9ICdlbXBsb3llcnMnO1xuICAgICAgfSBlbHNlIGlmICgkKCcjdXNlclR5cGUnKS52YWwoKSA9PT0gXCJFbXBsb3llclwiKSB7XG4gICAgICAgIGFqYXhPYmpbXCJ1cmxcIl0gPSBcIi9zdHVkZW50c1wiO1xuICAgICAgICBzZWFyY2hUeXBlID0gJ3N0dWRlbnRzJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGFqYXhPYmopO1xuXG4gICAgICAkLmFqYXgoYWpheE9iaikuZG9uZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzKTtcbiAgICAgICAgc3dpdGNoIChzZWFyY2hUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZW1wbG95ZXJzJzpcbiAgICAgICAgICAgIGhlbHBlcnMucmVuZGVyTGlzdGluZ3MocmVzLmNvbnRlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3R1ZGVudHMnOlxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvbnRlbnQpO1xuICAgICAgICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50cyhyZXMuY29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5zdHVkZW50c1RlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL3NlYXJjaC9zdHVkZW50cy5qYWRlJyk7XG4gICAgbG9jYWwubGlzdGluZ3NUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvZW1wbG95ZXJMaXN0aW5ncy5qYWRlJyk7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleHBvcnRzID0ge307XG5cbiAgICBleHBvcnRzLnJlbmRlckxpc3RpbmdzID0gZnVuY3Rpb24gKGxpc3RpbmdzKSB7XG4gICAgICB2YXIgbGlzdGluZ3MgICAgID0gbGlzdGluZ3MgfHwgW107XG4gICAgICB2YXIgbGlzdGluZ3NIVE1MID0gbG9jYWwubGlzdGluZ3NUZW1wbGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzfSk7XG4gICAgICBjb25zb2xlLmxvZygncmVuZGVyIHRoZW0nKTtcbiAgICAgICQoJyNyZXN1bHRzJykuaHRtbChsaXN0aW5nc0hUTUwpO1xuICAgIH1cblxuICAgIGV4cG9ydHMucmVuZGVyU3R1ZGVudHMgPSBmdW5jdGlvbiAoc3R1ZGVudHMpIHtcbiAgICAgIHZhciBzdHVkZW50cyAgICAgPSBzdHVkZW50cyB8fCBbXTtcbiAgICAgIHZhciBzdHVkZW50c0hUTUwgPSBsb2NhbC5zdHVkZW50c1RlbXBsYXRlKHtzdHVkZW50czogc3R1ZGVudHN9KTtcbiAgICAgICQoJyNyZXN1bHRzJykuaHRtbChzdHVkZW50c0hUTUwpO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAvLyBwb3B1bGF0ZSB3aXRoIGFsbCBzdHVkZW50cy9saXN0aW5nc1xuICAgIHB1YmxpYy5maWx0ZXIoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiNza2lsbFN1Ym1pdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBwdWJsaWMuZmlsdGVyKCk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYW5lbC1ib2R5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5yZXN0Jykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxuc2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIgPSBuZXcgU2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIoKTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBzZWFyY2hSZXN1bHRzQ29udHJvbGxlci5pbml0KCk7XG59KTtcbiIsbnVsbCwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuamFkZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKSA6IHZhbDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobGlzdGluZ3MpIHtcbmphZGVfbWl4aW5zW1wibGlzdGluZ1wiXSA9IGZ1bmN0aW9uKGxpc3Rpbmcpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj48ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj48ZGl2IGlkPVxcXCJpZFxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZTtcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5faWQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxoND48c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy50aXRsZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zdHJvbmc+PC9oND48aDU+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLmNvbXBhbnkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDU+PGg1PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5wb3NpdGlvbikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9oNT48aDU+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLmxvY2F0aW9uICAgICAgICAgICkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9oNT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGgzPjxzdHJvbmc+U2tpbGxzPC9zdHJvbmc+PC9oMz5cIik7XG4vLyBpdGVyYXRlIGxpc3Rpbmcuc2tpbGxzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGxpc3Rpbmcuc2tpbGxzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PGRpdiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZTtcXFwiIGNsYXNzPVxcXCJyb3cgcmVzdFxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aDQ+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjwvaDQ+PGRpdj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcuZW1wbG95ZXJOYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48YVwiICsgKGphZGUuYXR0cihcImhyZWZcIiwgXCJtYWlsdG86XCIgKyAobGlzdGluZy5lbWFpbCkgKyBcIlwiLCB0cnVlLCBmYWxzZSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLmVtYWlsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+PGJyLz48cD5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcuZGVzY3JpcHRpb24pID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG59O1xuYnVmLnB1c2goXCI8cD5saXN0aW5nPC9wPlwiKTtcbi8vIGl0ZXJhdGUgbGlzdGluZ3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlzdGluZ3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBsaXN0aW5nID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJsaXN0aW5nXCJdKGxpc3RpbmcpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGxpc3RpbmcgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImxpc3RpbmdcIl0obGlzdGluZyk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcImxpc3RpbmdzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5saXN0aW5nczp0eXBlb2YgbGlzdGluZ3MhPT1cInVuZGVmaW5lZFwiP2xpc3RpbmdzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHN0dWRlbnRzKSB7XG5qYWRlX21peGluc1tcImV4cGVyaWVuY2VcIl0gPSBmdW5jdGlvbihleHBlcmllbmNlKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGg0PmV4cGVyaWVuY2UuY29tcGFueTwvaDQ+PGg1PmV4cGVyaWVuY2UucG9zaXRpb248L2g1PjxoNiBzdHlsZT1cXFwibWFyZ2luOiAxMHB4IDBweFxcXCI+ZXhwZXJpZW5jZS5kZXNjcmlwdGlvbjwvaDY+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wic3R1ZGVudFwiXSA9IGZ1bmN0aW9uKHN0dWRlbnQpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0IHN0dWRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjxkaXYgaWQ9XFxcImlkXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQuX2lkKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aDQ+PHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zdHJvbmc+PC9oND48aDU+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzdHVkZW50LmVtYWlsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjxoNj5zdW1tYXJ5IG9mIG15IGxpZmUgZ29lcyBoZXJlIHlheTwvaDY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxoMz48c3Ryb25nPlNraWxsczwvc3Ryb25nPjwvaDM+XCIpO1xuLy8gaXRlcmF0ZSBzdHVkZW50LnNraWxsc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzdHVkZW50LnNraWxscztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtcHJpbWFyeVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtcHJpbWFyeVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG4vLyBpdGVyYXRlIHN0dWRlbnQuY2xhc3Nlc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzdHVkZW50LmNsYXNzZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBrbGFzcyA9ICQkb2JqWyRpbmRleF07XG5cbi8vIGl0ZXJhdGUga2xhc3Muc2tpbGxzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGtsYXNzLnNraWxscztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2xhc3MgPSAkJG9ialskaW5kZXhdO1xuXG4vLyBpdGVyYXRlIGtsYXNzLnNraWxsc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBrbGFzcy5za2lsbHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiBjbGFzcz1cXFwicm93IHJlc3RcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGgzPjxzdHJvbmc+RXhwZXJpZW5jZXNcIik7XG5qYWRlX21peGluc1tcImV4cGVyaWVuY2VcIl0oKTtcbmJ1Zi5wdXNoKFwiPC9zdHJvbmc+PC9oMz48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG59O1xuLy8gaXRlcmF0ZSBzdHVkZW50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzdHVkZW50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHN0dWRlbnQgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcInN0dWRlbnRcIl0oc3R1ZGVudCk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc3R1ZGVudCA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wic3R1ZGVudFwiXShzdHVkZW50KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwic3R1ZGVudHNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0dWRlbnRzOnR5cGVvZiBzdHVkZW50cyE9PVwidW5kZWZpbmVkXCI/c3R1ZGVudHM6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07Il19
