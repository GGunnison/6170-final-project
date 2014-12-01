!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.main=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main.js is compiled with Browserify through the gulp build system to public/src
// this allows us to use node modules on the front end and do client side templiting with jadeify
// author: sabrina
// TODO split up Browserify build to have multiple entires so that we can require the javascript files in their appropriate views
SearchResultsController = require('./searchResultsController');
IndexController  = require('./indexController');
SignupController = require('./signupController');

},{"./indexController":2,"./searchResultsController":3,"./signupController":4}],2:[function(require,module,exports){
var IndexController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.loginTemplate = require('../../views/templates/login.jade');
    local.signupTemplate = require('../../views/templates/signup.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderLogin = function() {
      var loginHTML = local.loginTemplate();
      $('#login-signup-form').html(loginHTML);
    }

    exports.renderSignup = function() {
      var signupHTML = local.signupTemplate();
      $('#login-signup-form').html(signupHTML);
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $('#login').click( function() {
      helpers.renderLogin();
    });

    $('#signup').click( function() {
      helpers.renderSignup();
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = IndexController;

},{"../../views/templates/login.jade":8,"../../views/templates/signup.jade":9}],3:[function(require,module,exports){
// author: Sabrina Drammis
module.exports = function () {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.featuredStudentTemplate = require('../../views/templates/userInfo.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.clearNavSelect = function () {
      $('.listed-student').removeClass('active');
    }

    exports.renderFeaturedStudent = function (studentId) {
      $.get('/students/' + studentId)
       .done(function (data) {
         var student = data.content;
         var featuredStudentHTML = local.featuredStudentTemplate({student: student});
         $('#featuredStudent').html(featuredStudentHTML);
       });
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $(".listed-student").click(function() {
      helpers.clearNavSelect();
      $(this).addClass('active');
      helpers.renderFeaturedStudent($(this).children('#id').text());
    });
  }

  return {
    public: public,
    init: init
  }

}

},{"../../views/templates/userInfo.jade":11}],4:[function(require,module,exports){
var SignupController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.studentSignupTemplate  = require('../../views/templates/student-signup.jade');
    local.employerSignupTemplate = require('../../views/templates/employer-signup.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderStudentSignup = function() {
      var studentSignupHTML = local.studentSignupTemplate();
      $('#signup-form-contents').html(studentSignupHTML);
    }

    exports.renderEmployerSignup = function() {
      var employerSignupHTML = local.employerSignupTemplate();
      $('#signup-form-contents').html(employerSignupHTML);
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $('#student-tab').click( function() {
      helpers.renderStudentSignup();
    });

    $('#employer-tab').click( function() {
      helpers.renderEmployerSignup();
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = SignupController;

},{"../../views/templates/employer-signup.jade":7,"../../views/templates/student-signup.jade":10}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
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
},{"fs":5}],7:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-md-6\"><input type=\"text\" placeholder=\"First name\" class=\"form-control form-control\"/></div><div class=\"col-md-6\"><input type=\"text\" placeholder=\"Last name\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"text\" placeholder=\"Company\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"text\" placeholder=\"Email address\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"password\" placeholder=\"Password\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"password\" placeholder=\"Confirm password\" class=\"form-control form-control\"/></div></div>");;return buf.join("");
};
},{"jade/runtime":6}],8:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<table><tr><div class=\"input-group\"><span class=\"input-group-addon\">@</span><input type=\"text\" placeholder=\"Email\" class=\"form-control form-control\"/></div></tr><tr><input type=\"password\" placeholder=\"Password\" class=\"form-control form-control\"/></tr><tr><button type=\"button\" class=\"btn btn-primary\">Sign In</button></tr></table>");;return buf.join("");
};
},{"jade/runtime":6}],9:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<script>var signupController = new SignupController();\n$(document).ready(function() {\n  signupController.init();\n});\n</script><div class=\"row\"><div id=\"student-tab\" class=\"col-md-6 text-center\"><h4>Student</h4></div><div id=\"employer-tab\" class=\"col-md-6 text-center\"><h4>Employer</h4></div></div><div id=\"signup-form-contents\" class=\"row\"></div>");;return buf.join("");
};
},{"jade/runtime":6}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-md-6\"><input type=\"text\" placeholder=\"First name\" class=\"form-control form-control\"/></div><div class=\"col-md-6\"><input type=\"text\" placeholder=\"Last name\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"text\" placeholder=\"Email address\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"password\" placeholder=\"Password\" class=\"form-control form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input type=\"password\" placeholder=\"Confirm password\" class=\"form-control form-control\"/></div></div>");;return buf.join("");
};
},{"jade/runtime":6}],11:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (student) {
buf.push("<!-- author: Sabrina Drammis--><h4 class=\"list-group-item-heading\">" + (jade.escape(null == (jade_interp = student.name) ? "" : jade_interp)) + "</h4><div id=\"id\" style=\"display:none\">" + (jade.escape(null == (jade_interp = student._id) ? "" : jade_interp)) + "</div><h5>" + (jade.escape(null == (jade_interp = student.email) ? "" : jade_interp)) + "</h5><h4>Skills");
// iterate student.skills
;(function(){
  var $$obj = student.skills;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var skill = $$obj[$index];

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-primary\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-primary\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
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

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
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

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var skill = $$obj[$index];

buf.push("<h4 style=\"display: inline-block; padding: 3px\"><span class=\"label label-default\">" + (jade.escape(null == (jade_interp = skill.name) ? "" : jade_interp)) + "</span></h4>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</h4>");}.call(this,"student" in locals_for_with?locals_for_with.student:typeof student!=="undefined"?student:undefined));;return buf.join("");
};
},{"jade/runtime":6}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYXBwXFxzcmNcXG1haW4uanMiLCJhcHBcXHNyY1xcaW5kZXhDb250cm9sbGVyLmpzIiwiYXBwXFxzcmNcXHNlYXJjaFJlc3VsdHNDb250cm9sbGVyLmpzIiwiYXBwXFxzcmNcXHNpZ251cENvbnRyb2xsZXIuanMiLCJub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXGxpYlxcX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzXFxqYWRlXFxydW50aW1lLmpzIiwidmlld3NcXHRlbXBsYXRlc1xcZW1wbG95ZXItc2lnbnVwLmphZGUiLCJ2aWV3c1xcdGVtcGxhdGVzXFxsb2dpbi5qYWRlIiwidmlld3NcXHRlbXBsYXRlc1xcc2lnbnVwLmphZGUiLCJ2aWV3c1xcdGVtcGxhdGVzXFxzdHVkZW50LXNpZ251cC5qYWRlIiwidmlld3NcXHRlbXBsYXRlc1xcdXNlckluZm8uamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gbWFpbi5qcyBpcyBjb21waWxlZCB3aXRoIEJyb3dzZXJpZnkgdGhyb3VnaCB0aGUgZ3VscCBidWlsZCBzeXN0ZW0gdG8gcHVibGljL3NyY1xyXG4vLyB0aGlzIGFsbG93cyB1cyB0byB1c2Ugbm9kZSBtb2R1bGVzIG9uIHRoZSBmcm9udCBlbmQgYW5kIGRvIGNsaWVudCBzaWRlIHRlbXBsaXRpbmcgd2l0aCBqYWRlaWZ5XHJcbi8vIGF1dGhvcjogc2FicmluYVxyXG4vLyBUT0RPIHNwbGl0IHVwIEJyb3dzZXJpZnkgYnVpbGQgdG8gaGF2ZSBtdWx0aXBsZSBlbnRpcmVzIHNvIHRoYXQgd2UgY2FuIHJlcXVpcmUgdGhlIGphdmFzY3JpcHQgZmlsZXMgaW4gdGhlaXIgYXBwcm9wcmlhdGUgdmlld3NcclxuU2VhcmNoUmVzdWx0c0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3NlYXJjaFJlc3VsdHNDb250cm9sbGVyJyk7XHJcbkluZGV4Q29udHJvbGxlciAgPSByZXF1aXJlKCcuL2luZGV4Q29udHJvbGxlcicpO1xyXG5TaWdudXBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zaWdudXBDb250cm9sbGVyJyk7XHJcbiIsInZhciBJbmRleENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxyXG4gIHZhciBwdWJsaWMgPSB7fTtcclxuXHJcbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXHJcbiAgdmFyIGxvY2FsID0ge307XHJcblxyXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbG9jYWwubG9naW5UZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9sb2dpbi5qYWRlJyk7XHJcbiAgICBsb2NhbC5zaWdudXBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zaWdudXAuamFkZScpO1xyXG4gIH1cclxuXHJcbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xyXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcclxuXHJcbiAgICBleHBvcnRzLnJlbmRlckxvZ2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBsb2dpbkhUTUwgPSBsb2NhbC5sb2dpblRlbXBsYXRlKCk7XHJcbiAgICAgICQoJyNsb2dpbi1zaWdudXAtZm9ybScpLmh0bWwobG9naW5IVE1MKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnRzLnJlbmRlclNpZ251cCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2lnbnVwSFRNTCA9IGxvY2FsLnNpZ251cFRlbXBsYXRlKCk7XHJcbiAgICAgICQoJyNsb2dpbi1zaWdudXAtZm9ybScpLmh0bWwoc2lnbnVwSFRNTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHNcclxuICB9KSgpO1xyXG5cclxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRMb2NhbCgpO1xyXG5cclxuICAgIHNpemluZ0pTKCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKHJlc3BvbnNpdmVKUyk7XHJcblxyXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHZhciBzaXppbmdKUyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHZhciByZXNwb25zaXZlSlMgPSBmdW5jdGlvbigpIHtcclxuICAgIHNpemluZ0pTKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNsb2dpbicpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgICAgaGVscGVycy5yZW5kZXJMb2dpbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3NpZ251cCcpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgICAgaGVscGVycy5yZW5kZXJTaWdudXAoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHB1YmxpYzogcHVibGljLFxyXG4gICAgaW5pdDogaW5pdFxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbmRleENvbnRyb2xsZXI7XHJcbiIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXHJcbiAgdmFyIHB1YmxpYyA9IHt9O1xyXG5cclxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcclxuICB2YXIgbG9jYWwgPSB7fTtcclxuXHJcbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsb2NhbC5mZWF0dXJlZFN0dWRlbnRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy91c2VySW5mby5qYWRlJyk7XHJcbiAgfVxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXHJcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xyXG5cclxuICAgIGV4cG9ydHMuY2xlYXJOYXZTZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5saXN0ZWQtc3R1ZGVudCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnRzLnJlbmRlckZlYXR1cmVkU3R1ZGVudCA9IGZ1bmN0aW9uIChzdHVkZW50SWQpIHtcclxuICAgICAgJC5nZXQoJy9zdHVkZW50cy8nICsgc3R1ZGVudElkKVxyXG4gICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgdmFyIHN0dWRlbnQgPSBkYXRhLmNvbnRlbnQ7XHJcbiAgICAgICAgIHZhciBmZWF0dXJlZFN0dWRlbnRIVE1MID0gbG9jYWwuZmVhdHVyZWRTdHVkZW50VGVtcGxhdGUoe3N0dWRlbnQ6IHN0dWRlbnR9KTtcclxuICAgICAgICAgJCgnI2ZlYXR1cmVkU3R1ZGVudCcpLmh0bWwoZmVhdHVyZWRTdHVkZW50SFRNTCk7XHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZXhwb3J0c1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXHJcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHNldExvY2FsKCk7XHJcblxyXG4gICAgc2l6aW5nSlMoKTtcclxuICAgICQod2luZG93KS5yZXNpemUocmVzcG9uc2l2ZUpTKTtcclxuXHJcbiAgICBldmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNpemluZ0pTID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIHJlc3BvbnNpdmVKUyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2l6aW5nSlMoKTtcclxuICB9XHJcblxyXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJChcIi5saXN0ZWQtc3R1ZGVudFwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgaGVscGVycy5jbGVhck5hdlNlbGVjdCgpO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgaGVscGVycy5yZW5kZXJGZWF0dXJlZFN0dWRlbnQoJCh0aGlzKS5jaGlsZHJlbignI2lkJykudGV4dCgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHB1YmxpYzogcHVibGljLFxyXG4gICAgaW5pdDogaW5pdFxyXG4gIH1cclxuXHJcbn1cclxuIiwidmFyIFNpZ251cENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxyXG4gIHZhciBwdWJsaWMgPSB7fTtcclxuXHJcbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXHJcbiAgdmFyIGxvY2FsID0ge307XHJcblxyXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlICA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zdHVkZW50LXNpZ251cC5qYWRlJyk7XHJcbiAgICBsb2NhbC5lbXBsb3llclNpZ251cFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL2VtcGxveWVyLXNpZ251cC5qYWRlJyk7XHJcbiAgfVxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXHJcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xyXG5cclxuICAgIGV4cG9ydHMucmVuZGVyU3R1ZGVudFNpZ251cCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc3R1ZGVudFNpZ251cEhUTUwgPSBsb2NhbC5zdHVkZW50U2lnbnVwVGVtcGxhdGUoKTtcclxuICAgICAgJCgnI3NpZ251cC1mb3JtLWNvbnRlbnRzJykuaHRtbChzdHVkZW50U2lnbnVwSFRNTCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0cy5yZW5kZXJFbXBsb3llclNpZ251cCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZW1wbG95ZXJTaWdudXBIVE1MID0gbG9jYWwuZW1wbG95ZXJTaWdudXBUZW1wbGF0ZSgpO1xyXG4gICAgICAkKCcjc2lnbnVwLWZvcm0tY29udGVudHMnKS5odG1sKGVtcGxveWVyU2lnbnVwSFRNTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHNcclxuICB9KSgpO1xyXG5cclxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRMb2NhbCgpO1xyXG5cclxuICAgIHNpemluZ0pTKCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKHJlc3BvbnNpdmVKUyk7XHJcblxyXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHZhciBzaXppbmdKUyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHZhciByZXNwb25zaXZlSlMgPSBmdW5jdGlvbigpIHtcclxuICAgIHNpemluZ0pTKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNzdHVkZW50LXRhYicpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZW1wbG95ZXItdGFiJykuY2xpY2soIGZ1bmN0aW9uKCkge1xyXG4gICAgICBoZWxwZXJzLnJlbmRlckVtcGxveWVyU2lnbnVwKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwdWJsaWM6IHB1YmxpYyxcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lnbnVwQ29udHJvbGxlcjtcclxuIixudWxsLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpLmZpbHRlcihudWxscykuam9pbignICcpIDogdmFsO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkZpcnN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiTGFzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbXBhbnlcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWwgYWRkcmVzc1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjx0YWJsZT48dHI+PGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPjxzcGFuIGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hZGRvblxcXCI+QDwvc3Bhbj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkVtYWlsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvdHI+PHRyPjxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbFxcXCIvPjwvdHI+PHRyPjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIEluPC9idXR0b24+PC90cj48L3RhYmxlPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8c2NyaXB0PnZhciBzaWdudXBDb250cm9sbGVyID0gbmV3IFNpZ251cENvbnRyb2xsZXIoKTtcXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcXG4gIHNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xcbn0pO1xcbjwvc2NyaXB0PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBpZD1cXFwic3R1ZGVudC10YWJcXFwiIGNsYXNzPVxcXCJjb2wtbWQtNiB0ZXh0LWNlbnRlclxcXCI+PGg0PlN0dWRlbnQ8L2g0PjwvZGl2PjxkaXYgaWQ9XFxcImVtcGxveWVyLXRhYlxcXCIgY2xhc3M9XFxcImNvbC1tZC02IHRleHQtY2VudGVyXFxcIj48aDQ+RW1wbG95ZXI8L2g0PjwvZGl2PjwvZGl2PjxkaXYgaWQ9XFxcInNpZ251cC1mb3JtLWNvbnRlbnRzXFxcIiBjbGFzcz1cXFwicm93XFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJGaXJzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkxhc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbWFpbCBhZGRyZXNzXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiQ29uZmlybSBwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoc3R1ZGVudCkge1xuYnVmLnB1c2goXCI8IS0tIGF1dGhvcjogU2FicmluYSBEcmFtbWlzLS0+PGg0IGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzdHVkZW50Lm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDQ+PGRpdiBpZD1cXFwiaWRcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc3R1ZGVudC5faWQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjxoNT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0dWRlbnQuZW1haWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDU+PGg0PlNraWxsc1wiKTtcbi8vIGl0ZXJhdGUgc3R1ZGVudC5za2lsbHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gc3R1ZGVudC5za2lsbHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGg0IHN0eWxlPVxcXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBhZGRpbmc6IDNweFxcXCI+PHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLXByaW1hcnlcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPjwvaDQ+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8aDQgc3R5bGU9XFxcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcGFkZGluZzogM3B4XFxcIj48c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtcHJpbWFyeVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PC9oND5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbi8vIGl0ZXJhdGUgc3R1ZGVudC5jbGFzc2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHN0dWRlbnQuY2xhc3NlcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGtsYXNzID0gJCRvYmpbJGluZGV4XTtcblxuLy8gaXRlcmF0ZSBrbGFzcy5za2lsbHNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0ga2xhc3Muc2tpbGxzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgc2tpbGwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxoNCBzdHlsZT1cXFwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwYWRkaW5nOiAzcHhcXFwiPjxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHNraWxsLm5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc3Bhbj48L2g0PlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGg0IHN0eWxlPVxcXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBhZGRpbmc6IDNweFxcXCI+PHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPjwvaDQ+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIga2xhc3MgPSAkJG9ialskaW5kZXhdO1xuXG4vLyBpdGVyYXRlIGtsYXNzLnNraWxsc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBrbGFzcy5za2lsbHM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBza2lsbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGg0IHN0eWxlPVxcXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBhZGRpbmc6IDNweFxcXCI+PHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gc2tpbGwubmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPjwvaDQ+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHNraWxsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8aDQgc3R5bGU9XFxcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcGFkZGluZzogM3B4XFxcIj48c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtZGVmYXVsdFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBza2lsbC5uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PC9oND5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L2g0PlwiKTt9LmNhbGwodGhpcyxcInN0dWRlbnRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0dWRlbnQ6dHlwZW9mIHN0dWRlbnQhPT1cInVuZGVmaW5lZFwiP3N0dWRlbnQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07Il19
