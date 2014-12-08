(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var SearchResultsController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.studentsTemplate = require('../../views/templates/search/students.jade');
    local.listingsTemplate = require('../../views/templates/search/employerListings.jade');

    local.filter = function () {
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
      if ($('#skillSubmit').attr("data-type") === "Student") {
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
            break
        }
      });
    }
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
      console.log(students);
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
    local.filter();
  }

  var eventListeners = function() {
      $("#skillSubmit").on("click", function() {
        local.filter();
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

var searchResultsController = new SearchResultsController();
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
buf.push("<div class=\"panel panel-default\"><div class=\"panel-body\"><div id=\"id\" style=\"display:none;\">" + (jade.escape(null == (jade_interp = listing._id) ? "" : jade_interp)) + "</div><div class=\"col-md-4\"><h4>" + (jade.escape(null == (jade_interp = listing.title) ? "" : jade_interp)) + "</h4><h4>" + (jade.escape(null == (jade_interp = listing.position) ? "" : jade_interp)) + "</h4><p>" + (jade.escape(null == (jade_interp = listing.description) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = listing.location) ? "" : jade_interp)) + "</p></div><div class=\"col-md-6\"><h4>Skills</h4><div class=\"resultSkills\">");
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

buf.push("</div></div></div></div>");
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

buf.push("<span class=\"label label-default\">skill</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<span class=\"label label-default\">skill</span>");
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
},{"jade/runtime":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL3NlYXJjaFJlc3VsdHNDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvc2VhcmNoL2VtcGxveWVyTGlzdGluZ3MuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvc3R1ZGVudHMuamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gYXV0aG9yOiBTYWJyaW5hIERyYW1taXNcbnZhciBTZWFyY2hSZXN1bHRzQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5zdHVkZW50c1RlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL3NlYXJjaC9zdHVkZW50cy5qYWRlJyk7XG4gICAgbG9jYWwubGlzdGluZ3NUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zZWFyY2gvZW1wbG95ZXJMaXN0aW5ncy5qYWRlJyk7XG5cbiAgICBsb2NhbC5maWx0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVxdWlyZWRTa2lsbHMgPSBbXTtcbiAgICAgIHZhciBkZXNpcmVkU2tpbGxzICA9IFtdO1xuXG4gICAgICAkKFwiLnJlcXVpcmVkU2tpbGxzRHJvcCAuc2tpbGwgc3BhblwiKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIHNraWxsX2lkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIHJlcXVpcmVkU2tpbGxzLnB1c2goc2tpbGxfaWQpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCIuZGVzaXJlZFNraWxsc0Ryb3AgLnNraWxsIHNwYW5cIikuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBza2lsbF9pZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgICAgICBkZXNpcmVkU2tpbGxzLnB1c2goc2tpbGxfaWQpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICByZXF1aXJlZFNraWxsczogcmVxdWlyZWRTa2lsbHMsXG4gICAgICAgIGRlc2lyZWRTa2lsbHM6IGRlc2lyZWRTa2lsbHMsXG4gICAgICAgIF9jc3JmOiBwdWJsaWMuY3NyZlxuICAgICAgfVxuXG4gICAgICB2YXIgYWpheE9iaiA9IHtcbiAgICAgICAgZGF0YXR5cGU6IFwianNvblwiLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9XG5cbiAgICAgIHZhciBzZWFyY2hUeXBlID0gbnVsbDtcbiAgICAgIGlmICgkKCcjc2tpbGxTdWJtaXQnKS5hdHRyKFwiZGF0YS10eXBlXCIpID09PSBcIlN0dWRlbnRcIikge1xuICAgICAgICBhamF4T2JqW1widXJsXCJdID0gXCIvZW1wbG95ZXJzXCI7XG4gICAgICAgIHNlYXJjaFR5cGUgPSAnZW1wbG95ZXJzJztcbiAgICAgIH0gZWxzZSBpZiAoJCgnI3NraWxsU3VibWl0JykuYXR0cihcImRhdGEtdHlwZVwiKSA9PT0gXCJFbXBsb3llclwiKSB7XG4gICAgICAgIGFqYXhPYmpbXCJ1cmxcIl0gPSBcIi9zdHVkZW50c1wiO1xuICAgICAgICBzZWFyY2hUeXBlID0gJ3N0dWRlbnRzJztcbiAgICAgIH1cblxuICAgICAgJC5hamF4KGFqYXhPYmopLmRvbmUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHN3aXRjaCAoc2VhcmNoVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2VtcGxveWVycyc6XG4gICAgICAgICAgICBoZWxwZXJzLnJlbmRlckxpc3RpbmdzKHJlcy5jb250ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N0dWRlbnRzJzpcbiAgICAgICAgICAgIGhlbHBlcnMucmVuZGVyU3R1ZGVudHMocmVzLmNvbnRlbnQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgZXhwb3J0cy5yZW5kZXJMaXN0aW5ncyA9IGZ1bmN0aW9uIChsaXN0aW5ncykge1xuICAgICAgdmFyIGxpc3RpbmdzICAgICA9IGxpc3RpbmdzIHx8IFtdO1xuICAgICAgdmFyIGxpc3RpbmdzSFRNTCA9IGxvY2FsLmxpc3RpbmdzVGVtcGxhdGUoe2xpc3RpbmdzOiBsaXN0aW5nc30pO1xuICAgICAgJCgnI3Jlc3VsdHMnKS5odG1sKGxpc3RpbmdzSFRNTCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5yZW5kZXJTdHVkZW50cyA9IGZ1bmN0aW9uIChzdHVkZW50cykge1xuICAgICAgdmFyIHN0dWRlbnRzICAgICA9IHN0dWRlbnRzIHx8IFtdO1xuICAgICAgY29uc29sZS5sb2coc3R1ZGVudHMpO1xuICAgICAgdmFyIHN0dWRlbnRzSFRNTCA9IGxvY2FsLnN0dWRlbnRzVGVtcGxhdGUoe3N0dWRlbnRzOiBzdHVkZW50c30pO1xuICAgICAgJCgnI3Jlc3VsdHMnKS5odG1sKHN0dWRlbnRzSFRNTCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHBvcHVsYXRlIHdpdGggYWxsIHN0dWRlbnRzL2xpc3RpbmdzXG4gICAgbG9jYWwuZmlsdGVyKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjc2tpbGxTdWJtaXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9jYWwuZmlsdGVyKCk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYW5lbC1ib2R5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5yZXN0Jykuc2xpZGVUb2dnbGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxudmFyIHNlYXJjaFJlc3VsdHNDb250cm9sbGVyID0gbmV3IFNlYXJjaFJlc3VsdHNDb250cm9sbGVyKCk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgc2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIuaW5pdCgpO1xufSk7XG4iLG51bGwsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7dmFyIGY7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9mPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2Y9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYoZj1zZWxmKSxmLmphZGU9ZSgpfX0oZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykuZmlsdGVyKG51bGxzKS5qb2luKCcgJykgOiB2YWw7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGxpc3RpbmdzKSB7XG5qYWRlX21peGluc1tcImxpc3RpbmdcIl0gPSBmdW5jdGlvbihsaXN0aW5nKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+PGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+PGRpdiBpZD1cXFwiaWRcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmU7XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RpbmcuX2lkKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNFxcXCI+PGg0PlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy50aXRsZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9oND48aDQ+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBsaXN0aW5nLnBvc2l0aW9uKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g0PjxwPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5kZXNjcmlwdGlvbikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjxwPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdGluZy5sb2NhdGlvbikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aDQ+U2tpbGxzPC9oND48ZGl2IGNsYXNzPVxcXCJyZXN1bHRTa2lsbHNcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgbGlzdGluZy5za2lsbHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlzdGluZy5za2lsbHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG59O1xuYnVmLnB1c2goXCI8cD5saXN0aW5nPC9wPlwiKTtcbi8vIGl0ZXJhdGUgbGlzdGluZ3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlzdGluZ3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBsaXN0aW5nID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJsaXN0aW5nXCJdKGxpc3RpbmcpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGxpc3RpbmcgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcImxpc3RpbmdcIl0obGlzdGluZyk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcImxpc3RpbmdzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5saXN0aW5nczp0eXBlb2YgbGlzdGluZ3MhPT1cInVuZGVmaW5lZFwiP2xpc3RpbmdzOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHN0dWRlbnRzKSB7XG5qYWRlX21peGluc1tcImV4cGVyaWVuY2VcIl0gPSBmdW5jdGlvbihleHBlcmllbmNlKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGg0PmV4cGVyaWVuY2UuY29tcGFueTwvaDQ+PGg1PmV4cGVyaWVuY2UucG9zaXRpb248L2g1PjxoNiBzdHlsZT1cXFwibWFyZ2luOiAxMHB4IDBweFxcXCI+ZXhwZXJpZW5jZS5kZXNjcmlwdGlvbjwvaDY+XCIpO1xufTtcbmphZGVfbWl4aW5zW1wic3R1ZGVudFwiXSA9IGZ1bmN0aW9uKHN0dWRlbnQpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0IHN0dWRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjxkaXYgaWQ9XFxcImlkXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQuX2lkKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aDQ+PHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zdHJvbmc+PC9oND48aDU+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzdHVkZW50LmVtYWlsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2g1PjxoNj5zdW1tYXJ5IG9mIG15IGxpZmUgZ29lcyBoZXJlIHlheTwvaDY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxoMz48c3Ryb25nPlNraWxsczwvc3Ryb25nPjwvaDM+XCIpO1xuLy8gaXRlcmF0ZSBzdHVkZW50LnNraWxsc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzdHVkZW50LnNraWxscztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+c2tpbGw8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+c2tpbGw8L3NwYW4+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PjwvZGl2PjxkaXYgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiBjbGFzcz1cXFwicm93IHJlc3RcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGgzPjxzdHJvbmc+RXhwZXJpZW5jZXNcIik7XG5qYWRlX21peGluc1tcImV4cGVyaWVuY2VcIl0oKTtcbmJ1Zi5wdXNoKFwiPC9zdHJvbmc+PC9oMz48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG59O1xuLy8gaXRlcmF0ZSBzdHVkZW50c1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzdHVkZW50cztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHN0dWRlbnQgPSAkJG9ialskaW5kZXhdO1xuXG5qYWRlX21peGluc1tcInN0dWRlbnRcIl0oc3R1ZGVudCk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgc3R1ZGVudCA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wic3R1ZGVudFwiXShzdHVkZW50KTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwic3R1ZGVudHNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0dWRlbnRzOnR5cGVvZiBzdHVkZW50cyE9PVwidW5kZWZpbmVkXCI/c3R1ZGVudHM6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07Il19
