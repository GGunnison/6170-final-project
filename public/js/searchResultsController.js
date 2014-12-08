!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.main=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var SearchResultsController = function() {

  // Public variables, available outside controller
  var public = {
    filter: function () {
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

      var searchType = null;
      if ($('#userType').attr("data-type") === "Student") {
        ajaxObj["url"] = "/employers";
        searchType = 'employers';
      } else if ($('#skillSubmit').attr("data-type") === "Employer") {
        ajaxObj["url"] = "/students";
        searchType = 'students';
      }

      $.ajax(ajaxObj).done(function(res) {
        switch (searchType) {
          case 'employers':
            helpers.renderListings(res.content);
            break;
          case 'students':
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
      $('#results').html(listingsHTML);
    }

    exports.renderStudents = function (students) {
      var students     = students || [];
      var studentsHTML = local.studentsTemplate({students: students});
      $('#results1').html(studentsHTML);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL3NlYXJjaFJlc3VsdHNDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvc2VhcmNoL2VtcGxveWVyTGlzdGluZ3MuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvc3R1ZGVudHMuamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gYXV0aG9yOiBTYWJyaW5hIERyYW1taXNcbnZhciBTZWFyY2hSZXN1bHRzQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXF1aXJlZFNraWxscyA9IFtdO1xuICAgICAgdmFyIGRlc2lyZWRTa2lsbHMgID0gW107XG5cbiAgICAgICQoXCIucmVxdWlyZWRTa2lsbHNEcm9wIC5za2lsbCBzcGFuXCIpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgc2tpbGxfaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgcmVxdWlyZWRTa2lsbHMucHVzaChza2lsbF9pZCk7XG4gICAgICB9KTtcblxuICAgICAgJChcIi5kZXNpcmVkU2tpbGxzRHJvcCAuc2tpbGwgc3BhblwiKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIHNraWxsX2lkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIGRlc2lyZWRTa2lsbHMucHVzaChza2lsbF9pZCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlcXVpcmVkU2tpbGxzOiByZXF1aXJlZFNraWxscyxcbiAgICAgICAgZGVzaXJlZFNraWxsczogZGVzaXJlZFNraWxscyxcbiAgICAgICAgX2NzcmY6IHB1YmxpYy5jc3JmXG4gICAgICB9XG5cbiAgICAgIHZhciBhamF4T2JqID0ge1xuICAgICAgICBkYXRhdHlwZTogXCJqc29uXCIsXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH1cblxuICAgICAgdmFyIHNlYXJjaFR5cGUgPSBudWxsO1xuICAgICAgaWYgKCQoJyN1c2VyVHlwZScpLmF0dHIoXCJkYXRhLXR5cGVcIikgPT09IFwiU3R1ZGVudFwiKSB7XG4gICAgICAgIGFqYXhPYmpbXCJ1cmxcIl0gPSBcIi9lbXBsb3llcnNcIjtcbiAgICAgICAgc2VhcmNoVHlwZSA9ICdlbXBsb3llcnMnO1xuICAgICAgfSBlbHNlIGlmICgkKCcjc2tpbGxTdWJtaXQnKS5hdHRyKFwiZGF0YS10eXBlXCIpID09PSBcIkVtcGxveWVyXCIpIHtcbiAgICAgICAgYWpheE9ialtcInVybFwiXSA9IFwiL3N0dWRlbnRzXCI7XG4gICAgICAgIHNlYXJjaFR5cGUgPSAnc3R1ZGVudHMnO1xuICAgICAgfVxuXG4gICAgICAkLmFqYXgoYWpheE9iaikuZG9uZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgc3dpdGNoIChzZWFyY2hUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZW1wbG95ZXJzJzpcbiAgICAgICAgICAgIGhlbHBlcnMucmVuZGVyTGlzdGluZ3MocmVzLmNvbnRlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3R1ZGVudHMnOlxuICAgICAgICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50cyhyZXMuY29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5zdHVkZW50c1RlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL3NlYXJjaC9zdHVkZW50cy5qYWRlJyk7XG4gICAgbG9jYWwubGlzdGluZ3NUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvZW1wbG95ZXJMaXN0aW5ncy5qYWRlJyk7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleHBvcnRzID0ge307XG5cbiAgICBleHBvcnRzLnJlbmRlckxpc3RpbmdzID0gZnVuY3Rpb24gKGxpc3RpbmdzKSB7XG4gICAgICB2YXIgbGlzdGluZ3MgICAgID0gbGlzdGluZ3MgfHwgW107XG4gICAgICB2YXIgbGlzdGluZ3NIVE1MID0gbG9jYWwubGlzdGluZ3NUZW1wbGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzfSk7XG4gICAgICAkKCcjcmVzdWx0cycpLmh0bWwobGlzdGluZ3NIVE1MKTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnJlbmRlclN0dWRlbnRzID0gZnVuY3Rpb24gKHN0dWRlbnRzKSB7XG4gICAgICB2YXIgc3R1ZGVudHMgICAgID0gc3R1ZGVudHMgfHwgW107XG4gICAgICB2YXIgc3R1ZGVudHNIVE1MID0gbG9jYWwuc3R1ZGVudHNUZW1wbGF0ZSh7c3R1ZGVudHM6IHN0dWRlbnRzfSk7XG4gICAgICAkKCcjcmVzdWx0czEnKS5odG1sKHN0dWRlbnRzSFRNTCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHBvcHVsYXRlIHdpdGggYWxsIHN0dWRlbnRzL2xpc3RpbmdzXG4gICAgcHVibGljLmZpbHRlcigpO1xuICB9XG5cbiAgdmFyIGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3NraWxsU3VibWl0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1YmxpYy5maWx0ZXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBhbmVsLWJvZHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLnJlc3QnKS5zbGlkZVRvZ2dsZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG5zZWFyY2hSZXN1bHRzQ29udHJvbGxlciA9IG5ldyBTZWFyY2hSZXN1bHRzQ29udHJvbGxlcigpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIHNlYXJjaFJlc3VsdHNDb250cm9sbGVyLmluaXQoKTtcbn0pO1xuIixudWxsLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpLmZpbHRlcihudWxscykuam9pbignICcpIDogdmFsO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChsaXN0aW5ncykge1xuamFkZV9taXhpbnNbXCJsaXN0aW5nXCJdID0gZnVuY3Rpb24obGlzdGluZyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjxkaXYgaWQ9XFxcImlkXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLl9pZCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGg0PjxzdHJvbmc+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLnRpdGxlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz48L2g0PjxoNT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcuY29tcGFueSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9oNT48aDU+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLnBvc2l0aW9uKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjxoNT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcubG9jYXRpb24gICAgICAgICAgKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aDM+PHN0cm9uZz5Ta2lsbHM8L3N0cm9uZz48L2gzPlwiKTtcbi8vIGl0ZXJhdGUgbGlzdGluZy5za2lsbHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlzdGluZy5za2lsbHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48ZGl2IHN0eWxlPVxcXCJkaXNwbGF5OiBub25lO1xcXCIgY2xhc3M9XFxcInJvdyByZXN0XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxoND48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+PC9oND48ZGl2PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5lbXBsb3llck5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCBcIm1haWx0bzpcIiArIChsaXN0aW5nLmVtYWlsKSArIFwiXCIsIHRydWUsIGZhbHNlKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcuZW1haWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48YnIvPjxwPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5kZXNjcmlwdGlvbikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTtcbn07XG5idWYucHVzaChcIjxwPmxpc3Rpbmc8L3A+XCIpO1xuLy8gaXRlcmF0ZSBsaXN0aW5nc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBsaXN0aW5ncztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGxpc3RpbmcgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImxpc3RpbmdcIl0obGlzdGluZyk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgbGlzdGluZyA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wibGlzdGluZ1wiXShsaXN0aW5nKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwibGlzdGluZ3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxpc3RpbmdzOnR5cGVvZiBsaXN0aW5ncyE9PVwidW5kZWZpbmVkXCI/bGlzdGluZ3M6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoc3R1ZGVudHMpIHtcbmphZGVfbWl4aW5zW1wiZXhwZXJpZW5jZVwiXSA9IGZ1bmN0aW9uKGV4cGVyaWVuY2Upe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8aDQ+ZXhwZXJpZW5jZS5jb21wYW55PC9oND48aDU+ZXhwZXJpZW5jZS5wb3NpdGlvbjwvaDU+PGg2IHN0eWxlPVxcXCJtYXJnaW46IDEwcHggMHB4XFxcIj5leHBlcmllbmNlLmRlc2NyaXB0aW9uPC9oNj5cIik7XG59O1xuamFkZV9taXhpbnNbXCJzdHVkZW50XCJdID0gZnVuY3Rpb24oc3R1ZGVudCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHQgc3R1ZGVudFxcXCI+PGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+PGRpdiBpZD1cXFwiaWRcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3R1ZGVudC5faWQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxoND48c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3R1ZGVudC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz48L2g0PjxoNT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQuZW1haWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDU+PGg2PnN1bW1hcnkgb2YgbXkgbGlmZSBnb2VzIGhlcmUgeWF5PC9oNj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGgzPjxzdHJvbmc+U2tpbGxzPC9zdHJvbmc+PC9oMz5cIik7XG4vLyBpdGVyYXRlIHN0dWRlbnQuc2tpbGxzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHN0dWRlbnQuc2tpbGxzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1wcmltYXJ5XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1wcmltYXJ5XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbi8vIGl0ZXJhdGUgc3R1ZGVudC5jbGFzc2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHN0dWRlbnQuY2xhc3NlcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtsYXNzID0gJCRvYmpbJGluZGV4XTtcblxuLy8gaXRlcmF0ZSBrbGFzcy5za2lsbHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0ga2xhc3Muc2tpbGxzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBrbGFzcyA9ICQkb2JqWyRpbmRleF07XG5cbi8vIGl0ZXJhdGUga2xhc3Muc2tpbGxzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGtsYXNzLnNraWxscztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PGRpdiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZTtcXFwiIGNsYXNzPVxcXCJyb3cgcmVzdFxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aDM+PHN0cm9uZz5FeHBlcmllbmNlc1wiKTtcbmphZGVfbWl4aW5zW1wiZXhwZXJpZW5jZVwiXSgpO1xuYnVmLnB1c2goXCI8L3N0cm9uZz48L2gzPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTtcbn07XG4vLyBpdGVyYXRlIHN0dWRlbnRzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHN0dWRlbnRzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc3R1ZGVudCA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wic3R1ZGVudFwiXShzdHVkZW50KTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBzdHVkZW50ID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJzdHVkZW50XCJdKHN0dWRlbnQpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJzdHVkZW50c1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3R1ZGVudHM6dHlwZW9mIHN0dWRlbnRzIT09XCJ1bmRlZmluZWRcIj9zdHVkZW50czp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiXX0=
