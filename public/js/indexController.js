!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.main=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var IndexController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.SignupController = require('./index/signupController');
    local.LoginController  = require('./index/loginController');
    local.loginTemplate    = require('../../views/templates/index/login.jade');
    local.signupTemplate   = require('../../views/templates/index/signup.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderLogin = function() {
      var loginHTML = local.loginTemplate();
      $('#login-signup-form').html(loginHTML);
      $('#login .slide-bar').addClass('selected');
      $('#signup .slide-bar').removeClass('selected');
    }

    exports.renderSignup = function() {
      var signupHTML = local.signupTemplate();
      $('#login-signup-form').html(signupHTML);
      $('#login .slide-bar').removeClass('selected');
      $('#signup .slide-bar').addClass('selected');
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();

    // initialize to having the login up
    var loginController = new local.LoginController();
    helpers.renderLogin();
    loginController.init();
  }

  var eventListeners = function() {
    $('#login').click( function() {
      var loginController = new local.LoginController();
      // this order is important
      helpers.renderLogin();
      loginController.init();
    });

    $('#signup').click( function() {
      var signupController = new local.SignupController();
      // this order is important
      helpers.renderSignup();
      signupController.init();
    });
  }

  return {
    public: public,
    init: init
  }
}

var indexController = new IndexController();
$(document).ready(function() {
  indexController.init();
});

},{"../../views/templates/index/login.jade":9,"../../views/templates/index/signup.jade":10,"./index/loginController":3,"./index/signupController":4}],2:[function(require,module,exports){
// author: Sabrina Drammis
var EmployerSignupController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#submit').on('click', function() {

      var data = { name: $('#firstName').val() + " " + $('#lastName').val(),
                   email: $('#email').val(),
                   password: $('#pass').val(),
                   passwordConfirm: $('#passConfirm').val(),
                   company: $('#company').val(),
                   type: 'Employer'
                 };
      $.ajax({
        type: "POST",
        url: '/signup',
        data: data
      }).done( function (data) {
        if (data.alertMessage) {
          $('#alertMessage').text(data.alertMessage);
          $('.alert').fadeIn(800);
        } else {
          window.location = '/profile';
        }
      });
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = EmployerSignupController;

},{}],3:[function(require,module,exports){
// author: Sabrina Drammis
var LoginController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#submit').on('click', function() {

      var data = { email: $('#email').val(),
                   password: $('#pass').val()
                 };
      $.ajax({
        type: "POST",
        url: '/login',
        data: data
      }).done( function (data) {
        if (data.alertMessage) {
          $('#alertMessage').text(data.alertMessage);
          $('.alert').fadeIn(800);
        } else {
          window.location = '/search';
        }
      });
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = LoginController;

},{}],4:[function(require,module,exports){
// author: Sabrina Drammis
var SignupController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.studentSignupController  = require('./studentSignupController');
    local.employerSignupController = require('./employerSignupController');
    local.studentSignupTemplate    = require('../../../views/templates/index/student-signup.jade');
    local.employerSignupTemplate   = require('../../../views/templates/index/employer-signup.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderStudentSignup = function() {
      var studentSignupHTML = local.studentSignupTemplate();
      document.getElementById('signup-form-contents').innerHTML = studentSignupHTML;
      var studentSignupController = new local.studentSignupController();
      studentSignupController.init();
    }

    exports.renderEmployerSignup = function() {
      var employerSignupHTML = local.employerSignupTemplate();
      document.getElementById('signup-form-contents').innerHTML = employerSignupHTML;
      var employerSignupController = new local.employerSignupController();
      employerSignupController.init();
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    // student signup is default
    helpers.renderStudentSignup();
  }

  var eventListeners = function() {
    $('#student-tab').click( function() {
      helpers.renderStudentSignup();

      $(this).children().removeClass('unselected-text');
      $(this).children().addClass('selected-text');

      $('#employer-tab').children().removeClass('selected-text');
      $('#employer-tab').children().addClass('unselected-text');
    });

    $('#employer-tab').click( function() {
      helpers.renderEmployerSignup();

      $(this).children().removeClass('unselected-text');
      $(this).children().addClass('selected-text');

      $('#student-tab').children().removeClass('selected-text');
      $('#student-tab').children().addClass('unselected-text');
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = SignupController;

},{"../../../views/templates/index/employer-signup.jade":8,"../../../views/templates/index/student-signup.jade":11,"./employerSignupController":2,"./studentSignupController":5}],5:[function(require,module,exports){
// author: Sabrina Drammis
var StudentSignupController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();
    eventListeners();

    $('.alert').hide();
  }

  var eventListeners = function() {
    $('#submit').on('click', function() {

      var data = { name: $('#firstName').val() + " " + $('#lastName').val(),
                   email: $('#email').val(),
                   password: $('#pass').val(),
                   passwordConfirm: $('#passConfirm').val(),
                   type: 'Student'
                 };
      $.ajax({
        type: "POST",
        url: '/signup',
        data: data
      }).done( function (data) {
        if (data.alertMessage) {
          $('#alertMessage').text(data.alertMessage);
          $('.alert').fadeIn(800);
        } else {
          window.location = '/profile';
        }
      });
    });
  }

  return {
    public: public,
    init: init
  }
}

module.exports = StudentSignupController;

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
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
},{"fs":6}],8:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<form id=\"employerSignupForm\"><div class=\"row\"><div class=\"col-md-6\"><input id=\"firstName\" type=\"text\" placeholder=\"First name\" class=\"form-control\"/></div><div class=\"col-md-6\"><input id=\"lastName\" type=\"text\" placeholder=\"Last name\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"company\" type=\"text\" placeholder=\"Company\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"email\" type=\"text\" placeholder=\"Email address\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"pass\" type=\"password\" placeholder=\"Password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"passConfirm\" type=\"password\" placeholder=\"Confirm password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><button id=\"submit\" type=\"button\" class=\"btn btn-primary\">Sign Up</button></div></div></form>");;return buf.join("");
};
},{"jade/runtime":7}],9:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-md-12\"><div role=\"alert\" class=\"alert alert-danger alert-dismissible\"><div id=\"alertMessage\">alert goes here</div></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"input-group\"><span class=\"input-group-addon\">@</span><input id=\"email\" type=\"text\" placeholder=\"Email\" class=\"form-control\"/></div></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"pass\" type=\"password\" placeholder=\"Password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><button id=\"submit\" class=\"btn btn-primary\">Sign In</button></div></div>");;return buf.join("");
};
},{"jade/runtime":7}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div id=\"student-tab\" class=\"col-md-6 text-center\"><h3 class=\"selector selected-text\">Student</h3></div><div id=\"employer-tab\" class=\"col-md-6 text-center selector\"><h3 class=\"selector unselected-text\">Employer</h3></div></div><div class=\"row\"><div class=\"col-md-12\"><div role=\"alert\" class=\"alert alert-danger\"><div id=\"alertMessage\">alert goes here</div></div></div></div><div id=\"signup-form-contents\" class=\"row\"></div>");;return buf.join("");
};
},{"jade/runtime":7}],11:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-md-6\"><input id=\"firstName\" placeholder=\"First name\" class=\"form-control\"/></div><div class=\"col-md-6\"><input id=\"lastName\" placeholder=\"Last name\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"email\" placeholder=\"Email address\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"pass\" type=\"password\" placeholder=\"Password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"passConfirm\" type=\"password\" placeholder=\"Confirm password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><button id=\"submit\" class=\"btn btn-primary\">Sign Up</button></div></div>");;return buf.join("");
};
},{"jade/runtime":7}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2luZGV4Q29udHJvbGxlci5qcyIsImFwcC9zcmMvaW5kZXgvZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmpzIiwiYXBwL3NyYy9pbmRleC9sb2dpbkNvbnRyb2xsZXIuanMiLCJhcHAvc3JjL2luZGV4L3NpZ251cENvbnRyb2xsZXIuanMiLCJhcHAvc3JjL2luZGV4L3N0dWRlbnRTaWdudXBDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvaW5kZXgvZW1wbG95ZXItc2lnbnVwLmphZGUiLCJ2aWV3cy90ZW1wbGF0ZXMvaW5kZXgvbG9naW4uamFkZSIsInZpZXdzL3RlbXBsYXRlcy9pbmRleC9zaWdudXAuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9pbmRleC9zdHVkZW50LXNpZ251cC5qYWRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gYXV0aG9yOiBTYWJyaW5hIERyYW1taXNcbnZhciBJbmRleENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXG4gIHZhciBwdWJsaWMgPSB7fTtcblxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcbiAgdmFyIGxvY2FsID0ge307XG5cbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XG4gICAgbG9jYWwuU2lnbnVwQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vaW5kZXgvc2lnbnVwQ29udHJvbGxlcicpO1xuICAgIGxvY2FsLkxvZ2luQ29udHJvbGxlciAgPSByZXF1aXJlKCcuL2luZGV4L2xvZ2luQ29udHJvbGxlcicpO1xuICAgIGxvY2FsLmxvZ2luVGVtcGxhdGUgICAgPSByZXF1aXJlKCcuLi8uLi92aWV3cy90ZW1wbGF0ZXMvaW5kZXgvbG9naW4uamFkZScpO1xuICAgIGxvY2FsLnNpZ251cFRlbXBsYXRlICAgPSByZXF1aXJlKCcuLi8uLi92aWV3cy90ZW1wbGF0ZXMvaW5kZXgvc2lnbnVwLmphZGUnKTtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIGV4cG9ydHMucmVuZGVyTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsb2dpbkhUTUwgPSBsb2NhbC5sb2dpblRlbXBsYXRlKCk7XG4gICAgICAkKCcjbG9naW4tc2lnbnVwLWZvcm0nKS5odG1sKGxvZ2luSFRNTCk7XG4gICAgICAkKCcjbG9naW4gLnNsaWRlLWJhcicpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgJCgnI3NpZ251cCAuc2xpZGUtYmFyJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5yZW5kZXJTaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzaWdudXBIVE1MID0gbG9jYWwuc2lnbnVwVGVtcGxhdGUoKTtcbiAgICAgICQoJyNsb2dpbi1zaWdudXAtZm9ybScpLmh0bWwoc2lnbnVwSFRNTCk7XG4gICAgICAkKCcjbG9naW4gLnNsaWRlLWJhcicpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgJCgnI3NpZ251cCAuc2xpZGUtYmFyJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG5cbiAgICBldmVudExpc3RlbmVycygpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB0byBoYXZpbmcgdGhlIGxvZ2luIHVwXG4gICAgdmFyIGxvZ2luQ29udHJvbGxlciA9IG5ldyBsb2NhbC5Mb2dpbkNvbnRyb2xsZXIoKTtcbiAgICBoZWxwZXJzLnJlbmRlckxvZ2luKCk7XG4gICAgbG9naW5Db250cm9sbGVyLmluaXQoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNsb2dpbicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsb2dpbkNvbnRyb2xsZXIgPSBuZXcgbG9jYWwuTG9naW5Db250cm9sbGVyKCk7XG4gICAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudFxuICAgICAgaGVscGVycy5yZW5kZXJMb2dpbigpO1xuICAgICAgbG9naW5Db250cm9sbGVyLmluaXQoKTtcbiAgICB9KTtcblxuICAgICQoJyNzaWdudXAnKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2lnbnVwQ29udHJvbGxlciA9IG5ldyBsb2NhbC5TaWdudXBDb250cm9sbGVyKCk7XG4gICAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudFxuICAgICAgaGVscGVycy5yZW5kZXJTaWdudXAoKTtcbiAgICAgIHNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxudmFyIGluZGV4Q29udHJvbGxlciA9IG5ldyBJbmRleENvbnRyb2xsZXIoKTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBpbmRleENvbnRyb2xsZXIuaW5pdCgpO1xufSk7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIEVtcGxveWVyU2lnbnVwQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBkYXRhID0geyBuYW1lOiAkKCcjZmlyc3ROYW1lJykudmFsKCkgKyBcIiBcIiArICQoJyNsYXN0TmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkKCcjZW1haWwnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbmZpcm06ICQoJyNwYXNzQ29uZmlybScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIGNvbXBhbnk6ICQoJyNjb21wYW55JykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgdHlwZTogJ0VtcGxveWVyJ1xuICAgICAgICAgICAgICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XG4gICAgICAgICAgJCgnLmFsZXJ0JykuZmFkZUluKDgwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9wcm9maWxlJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVtcGxveWVyU2lnbnVwQ29udHJvbGxlcjtcbiIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgTG9naW5Db250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxuICB2YXIgcHVibGljID0ge307XG5cbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXG4gIHZhciBsb2NhbCA9IHt9O1xuXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICQoJy5hbGVydCcpLmhpZGUoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIGRhdGEgPSB7IGVtYWlsOiAkKCcjZW1haWwnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKVxuICAgICAgICAgICAgICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmFsZXJ0TWVzc2FnZSkge1xuICAgICAgICAgICQoJyNhbGVydE1lc3NhZ2UnKS50ZXh0KGRhdGEuYWxlcnRNZXNzYWdlKTtcbiAgICAgICAgICAkKCcuYWxlcnQnKS5mYWRlSW4oODAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3NlYXJjaCc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpbkNvbnRyb2xsZXI7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIFNpZ251cENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXG4gIHZhciBwdWJsaWMgPSB7fTtcblxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcbiAgdmFyIGxvY2FsID0ge307XG5cbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cENvbnRyb2xsZXIgID0gcmVxdWlyZSgnLi9zdHVkZW50U2lnbnVwQ29udHJvbGxlcicpO1xuICAgIGxvY2FsLmVtcGxveWVyU2lnbnVwQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vZW1wbG95ZXJTaWdudXBDb250cm9sbGVyJyk7XG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi4vLi4vLi4vdmlld3MvdGVtcGxhdGVzL2luZGV4L3N0dWRlbnQtc2lnbnVwLmphZGUnKTtcbiAgICBsb2NhbC5lbXBsb3llclNpZ251cFRlbXBsYXRlICAgPSByZXF1aXJlKCcuLi8uLi8uLi92aWV3cy90ZW1wbGF0ZXMvaW5kZXgvZW1wbG95ZXItc2lnbnVwLmphZGUnKTtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIGV4cG9ydHMucmVuZGVyU3R1ZGVudFNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0dWRlbnRTaWdudXBIVE1MID0gbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLWZvcm0tY29udGVudHMnKS5pbm5lckhUTUwgPSBzdHVkZW50U2lnbnVwSFRNTDtcbiAgICAgIHZhciBzdHVkZW50U2lnbnVwQ29udHJvbGxlciA9IG5ldyBsb2NhbC5zdHVkZW50U2lnbnVwQ29udHJvbGxlcigpO1xuICAgICAgc3R1ZGVudFNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGV4cG9ydHMucmVuZGVyRW1wbG95ZXJTaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbXBsb3llclNpZ251cEhUTUwgPSBsb2NhbC5lbXBsb3llclNpZ251cFRlbXBsYXRlKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLWZvcm0tY29udGVudHMnKS5pbm5lckhUTUwgPSBlbXBsb3llclNpZ251cEhUTUw7XG4gICAgICB2YXIgZW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gbmV3IGxvY2FsLmVtcGxveWVyU2lnbnVwQ29udHJvbGxlcigpO1xuICAgICAgZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwb3J0c1xuICB9KSgpO1xuXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0TG9jYWwoKTtcbiAgICBldmVudExpc3RlbmVycygpO1xuXG4gICAgLy8gc3R1ZGVudCBzaWdudXAgaXMgZGVmYXVsdFxuICAgIGhlbHBlcnMucmVuZGVyU3R1ZGVudFNpZ251cCgpO1xuICB9XG5cbiAgdmFyIGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnI3N0dWRlbnQtdGFiJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XG5cbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygndW5zZWxlY3RlZC10ZXh0Jyk7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuYWRkQ2xhc3MoJ3NlbGVjdGVkLXRleHQnKTtcblxuICAgICAgJCgnI2VtcGxveWVyLXRhYicpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkLXRleHQnKTtcbiAgICAgICQoJyNlbXBsb3llci10YWInKS5jaGlsZHJlbigpLmFkZENsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcbiAgICB9KTtcblxuICAgICQoJyNlbXBsb3llci10YWInKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICBoZWxwZXJzLnJlbmRlckVtcGxveWVyU2lnbnVwKCk7XG5cbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygndW5zZWxlY3RlZC10ZXh0Jyk7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuYWRkQ2xhc3MoJ3NlbGVjdGVkLXRleHQnKTtcblxuICAgICAgJCgnI3N0dWRlbnQtdGFiJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xuICAgICAgJCgnI3N0dWRlbnQtdGFiJykuY2hpbGRyZW4oKS5hZGRDbGFzcygndW5zZWxlY3RlZC10ZXh0Jyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ251cENvbnRyb2xsZXI7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIFN0dWRlbnRTaWdudXBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxuICB2YXIgcHVibGljID0ge307XG5cbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXG4gIHZhciBsb2NhbCA9IHt9O1xuXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICQoJy5hbGVydCcpLmhpZGUoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIGRhdGEgPSB7IG5hbWU6ICQoJyNmaXJzdE5hbWUnKS52YWwoKSArIFwiIFwiICsgJCgnI2xhc3ROYW1lJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgZW1haWw6ICQoJyNlbWFpbCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkKCcjcGFzcycpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogJCgnI3Bhc3NDb25maXJtJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgdHlwZTogJ1N0dWRlbnQnXG4gICAgICAgICAgICAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmFsZXJ0TWVzc2FnZSkge1xuICAgICAgICAgICQoJyNhbGVydE1lc3NhZ2UnKS50ZXh0KGRhdGEuYWxlcnRNZXNzYWdlKTtcbiAgICAgICAgICAkKCcuYWxlcnQnKS5mYWRlSW4oODAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Byb2ZpbGUnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHVibGljOiBwdWJsaWMsXG4gICAgaW5pdDogaW5pdFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3R1ZGVudFNpZ251cENvbnRyb2xsZXI7XG4iLG51bGwsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7dmFyIGY7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9mPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2Y9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYoZj1zZWxmKSxmLmphZGU9ZSgpfX0oZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykuZmlsdGVyKG51bGxzKS5qb2luKCcgJykgOiB2YWw7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxmb3JtIGlkPVxcXCJlbXBsb3llclNpZ251cEZvcm1cXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwiZmlyc3ROYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRmlyc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgaWQ9XFxcImxhc3ROYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiTGFzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwiY29tcGFueVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbXBhbnlcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkVtYWlsIGFkZHJlc3NcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc0NvbmZpcm1cXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiQ29uZmlybSBwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2lnbiBVcDwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZm9ybT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiIGNsYXNzPVxcXCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGVcXFwiPjxkaXYgaWQ9XFxcImFsZXJ0TWVzc2FnZVxcXCI+YWxlcnQgZ29lcyBoZXJlPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwXFxcIj48c3BhbiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtYWRkb25cXFwiPkA8L3NwYW4+PGlucHV0IGlkPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkVtYWlsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc1xcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNpZ24gSW48L2J1dHRvbj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGlkPVxcXCJzdHVkZW50LXRhYlxcXCIgY2xhc3M9XFxcImNvbC1tZC02IHRleHQtY2VudGVyXFxcIj48aDMgY2xhc3M9XFxcInNlbGVjdG9yIHNlbGVjdGVkLXRleHRcXFwiPlN0dWRlbnQ8L2gzPjwvZGl2PjxkaXYgaWQ9XFxcImVtcGxveWVyLXRhYlxcXCIgY2xhc3M9XFxcImNvbC1tZC02IHRleHQtY2VudGVyIHNlbGVjdG9yXFxcIj48aDMgY2xhc3M9XFxcInNlbGVjdG9yIHVuc2VsZWN0ZWQtdGV4dFxcXCI+RW1wbG95ZXI8L2gzPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48ZGl2IHJvbGU9XFxcImFsZXJ0XFxcIiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyXFxcIj48ZGl2IGlkPVxcXCJhbGVydE1lc3NhZ2VcXFwiPmFsZXJ0IGdvZXMgaGVyZTwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgaWQ9XFxcInNpZ251cC1mb3JtLWNvbnRlbnRzXFxcIiBjbGFzcz1cXFwicm93XFxcIj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IGlkPVxcXCJmaXJzdE5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJGaXJzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwibGFzdE5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJMYXN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJlbWFpbFxcXCIgcGxhY2Vob2xkZXI9XFxcIkVtYWlsIGFkZHJlc3NcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc0NvbmZpcm1cXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiQ29uZmlybSBwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNpZ24gVXA8L2J1dHRvbj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07Il19
