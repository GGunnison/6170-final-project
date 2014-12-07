(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var IndexController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.SignupController = require('./index/signupController');
    local.LoginController  = require('./index/loginController');
    local.loginTemplate    = require('../../views/templates/login.jade');
    local.signupTemplate   = require('../../views/templates/signup.jade');
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

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();

    // initialize to having the login up
    var loginController = new local.LoginController();
    helpers.renderLogin();
    loginController.init();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
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

},{"../../views/templates/login.jade":9,"../../views/templates/signup.jade":10,"./index/loginController":3,"./index/signupController":4}],2:[function(require,module,exports){
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
          $('.alert').show();
        } else {
          window.locatin = '/profile/create';
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
          $('.alert').show();
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
    local.studentSignupTemplate    = require('../../../views/templates/student-signup.jade');
    local.employerSignupTemplate   = require('../../../views/templates/employer-signup.jade');
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

},{"../../../views/templates/employer-signup.jade":8,"../../../views/templates/student-signup.jade":11,"./employerSignupController":2,"./studentSignupController":5}],5:[function(require,module,exports){
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
          $('.alert').show();
        } else {
          window.location = '/profile/create';
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

buf.push("<div class=\"row\"><div id=\"student-tab\" class=\"col-md-6 text-center\"><h3 class=\"selector selected-text\">Student</h3></div><div id=\"employer-tab\" class=\"col-md-6 text-center selector\"><h3 class=\"selector unselected-text\">Employer</h3></div></div><div class=\"row\"><div class=\"col-md-12\"><div role=\"alert\" class=\"alert alert-danger alert-dismissible\"><div id=\"alertMessage\">alert goes here</div></div></div></div><div id=\"signup-form-contents\" class=\"row\"></div>");;return buf.join("");
};
},{"jade/runtime":7}],11:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-md-6\"><input id=\"firstName\" placeholder=\"First name\" class=\"form-control\"/></div><div class=\"col-md-6\"><input id=\"lastName\" placeholder=\"Last name\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"email\" placeholder=\"Email address\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"pass\" type=\"password\" placeholder=\"Password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><input id=\"passConfirm\" type=\"password\" placeholder=\"Confirm password\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-md-12\"><button id=\"submit\" class=\"btn btn-primary\">Sign Up</button></div></div>");;return buf.join("");
};
},{"jade/runtime":7}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2luZGV4Q29udHJvbGxlci5qcyIsImFwcC9zcmMvaW5kZXgvZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmpzIiwiYXBwL3NyYy9pbmRleC9sb2dpbkNvbnRyb2xsZXIuanMiLCJhcHAvc3JjL2luZGV4L3NpZ251cENvbnRyb2xsZXIuanMiLCJhcHAvc3JjL2luZGV4L3N0dWRlbnRTaWdudXBDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvZW1wbG95ZXItc2lnbnVwLmphZGUiLCJ2aWV3cy90ZW1wbGF0ZXMvbG9naW4uamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zaWdudXAuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zdHVkZW50LXNpZ251cC5qYWRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgSW5kZXhDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxuICB2YXIgcHVibGljID0ge307XG5cbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXG4gIHZhciBsb2NhbCA9IHt9O1xuXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xuICAgIGxvY2FsLlNpZ251cENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2luZGV4L3NpZ251cENvbnRyb2xsZXInKTtcbiAgICBsb2NhbC5Mb2dpbkNvbnRyb2xsZXIgID0gcmVxdWlyZSgnLi9pbmRleC9sb2dpbkNvbnRyb2xsZXInKTtcbiAgICBsb2NhbC5sb2dpblRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL2xvZ2luLmphZGUnKTtcbiAgICBsb2NhbC5zaWdudXBUZW1wbGF0ZSAgID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL3NpZ251cC5qYWRlJyk7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleHBvcnRzID0ge307XG5cbiAgICBleHBvcnRzLnJlbmRlckxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbG9naW5IVE1MID0gbG9jYWwubG9naW5UZW1wbGF0ZSgpO1xuICAgICAgJCgnI2xvZ2luLXNpZ251cC1mb3JtJykuaHRtbChsb2dpbkhUTUwpO1xuICAgICAgJCgnI2xvZ2luIC5zbGlkZS1iYXInKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICQoJyNzaWdudXAgLnNsaWRlLWJhcicpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGV4cG9ydHMucmVuZGVyU2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2lnbnVwSFRNTCA9IGxvY2FsLnNpZ251cFRlbXBsYXRlKCk7XG4gICAgICAkKCcjbG9naW4tc2lnbnVwLWZvcm0nKS5odG1sKHNpZ251cEhUTUwpO1xuICAgICAgJCgnI2xvZ2luIC5zbGlkZS1iYXInKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICQoJyNzaWdudXAgLnNsaWRlLWJhcicpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuXG4gICAgc2l6aW5nSlMoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKHJlc3BvbnNpdmVKUyk7XG5cbiAgICBldmVudExpc3RlbmVycygpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB0byBoYXZpbmcgdGhlIGxvZ2luIHVwXG4gICAgdmFyIGxvZ2luQ29udHJvbGxlciA9IG5ldyBsb2NhbC5Mb2dpbkNvbnRyb2xsZXIoKTtcbiAgICBoZWxwZXJzLnJlbmRlckxvZ2luKCk7XG4gICAgbG9naW5Db250cm9sbGVyLmluaXQoKTtcbiAgfVxuXG4gIHZhciBzaXppbmdKUyA9IGZ1bmN0aW9uKCkge1xuXG4gIH1cblxuICB2YXIgcmVzcG9uc2l2ZUpTID0gZnVuY3Rpb24oKSB7XG4gICAgc2l6aW5nSlMoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNsb2dpbicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsb2dpbkNvbnRyb2xsZXIgPSBuZXcgbG9jYWwuTG9naW5Db250cm9sbGVyKCk7XG4gICAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudFxuICAgICAgaGVscGVycy5yZW5kZXJMb2dpbigpO1xuICAgICAgbG9naW5Db250cm9sbGVyLmluaXQoKTtcbiAgICB9KTtcblxuICAgICQoJyNzaWdudXAnKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2lnbnVwQ29udHJvbGxlciA9IG5ldyBsb2NhbC5TaWdudXBDb250cm9sbGVyKCk7XG4gICAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudFxuICAgICAgaGVscGVycy5yZW5kZXJTaWdudXAoKTtcbiAgICAgIHNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxudmFyIGluZGV4Q29udHJvbGxlciA9IG5ldyBJbmRleENvbnRyb2xsZXIoKTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBpbmRleENvbnRyb2xsZXIuaW5pdCgpO1xufSk7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIEVtcGxveWVyU2lnbnVwQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBkYXRhID0geyBuYW1lOiAkKCcjZmlyc3ROYW1lJykudmFsKCkgKyBcIiBcIiArICQoJyNsYXN0TmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkKCcjZW1haWwnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbmZpcm06ICQoJyNwYXNzQ29uZmlybScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIGNvbXBhbnk6ICQoJyNjb21wYW55JykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgdHlwZTogJ0VtcGxveWVyJ1xuICAgICAgICAgICAgICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XG4gICAgICAgICAgJCgnLmFsZXJ0Jykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGluID0gJy9wcm9maWxlL2NyZWF0ZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbXBsb3llclNpZ251cENvbnRyb2xsZXI7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIExvZ2luQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBkYXRhID0geyBlbWFpbDogJCgnI2VtYWlsJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQoJyNwYXNzJykudmFsKClcbiAgICAgICAgICAgICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XG4gICAgICAgICAgJCgnLmFsZXJ0Jykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvc2VhcmNoJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luQ29udHJvbGxlcjtcbiIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgU2lnbnVwQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5zdHVkZW50U2lnbnVwQ29udHJvbGxlciAgPSByZXF1aXJlKCcuL3N0dWRlbnRTaWdudXBDb250cm9sbGVyJyk7XG4gICAgbG9jYWwuZW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9lbXBsb3llclNpZ251cENvbnRyb2xsZXInKTtcbiAgICBsb2NhbC5zdHVkZW50U2lnbnVwVGVtcGxhdGUgICAgPSByZXF1aXJlKCcuLi8uLi8uLi92aWV3cy90ZW1wbGF0ZXMvc3R1ZGVudC1zaWdudXAuamFkZScpO1xuICAgIGxvY2FsLmVtcGxveWVyU2lnbnVwVGVtcGxhdGUgICA9IHJlcXVpcmUoJy4uLy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9lbXBsb3llci1zaWdudXAuamFkZScpO1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgZXhwb3J0cy5yZW5kZXJTdHVkZW50U2lnbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3R1ZGVudFNpZ251cEhUTUwgPSBsb2NhbC5zdHVkZW50U2lnbnVwVGVtcGxhdGUoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXAtZm9ybS1jb250ZW50cycpLmlubmVySFRNTCA9IHN0dWRlbnRTaWdudXBIVE1MO1xuICAgICAgdmFyIHN0dWRlbnRTaWdudXBDb250cm9sbGVyID0gbmV3IGxvY2FsLnN0dWRlbnRTaWdudXBDb250cm9sbGVyKCk7XG4gICAgICBzdHVkZW50U2lnbnVwQ29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5yZW5kZXJFbXBsb3llclNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVtcGxveWVyU2lnbnVwSFRNTCA9IGxvY2FsLmVtcGxveWVyU2lnbnVwVGVtcGxhdGUoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXAtZm9ybS1jb250ZW50cycpLmlubmVySFRNTCA9IGVtcGxveWVyU2lnbnVwSFRNTDtcbiAgICAgIHZhciBlbXBsb3llclNpZ251cENvbnRyb2xsZXIgPSBuZXcgbG9jYWwuZW1wbG95ZXJTaWdudXBDb250cm9sbGVyKCk7XG4gICAgICBlbXBsb3llclNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAvLyBzdHVkZW50IHNpZ251cCBpcyBkZWZhdWx0XG4gICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3R1ZGVudC10YWInKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICBoZWxwZXJzLnJlbmRlclN0dWRlbnRTaWdudXAoKTtcblxuICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5hZGRDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xuXG4gICAgICAkKCcjZW1wbG95ZXItdGFiJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xuICAgICAgJCgnI2VtcGxveWVyLXRhYicpLmNoaWxkcmVuKCkuYWRkQ2xhc3MoJ3Vuc2VsZWN0ZWQtdGV4dCcpO1xuICAgIH0pO1xuXG4gICAgJCgnI2VtcGxveWVyLXRhYicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICAgIGhlbHBlcnMucmVuZGVyRW1wbG95ZXJTaWdudXAoKTtcblxuICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5hZGRDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xuXG4gICAgICAkKCcjc3R1ZGVudC10YWInKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZC10ZXh0Jyk7XG4gICAgICAkKCcjc3R1ZGVudC10YWInKS5jaGlsZHJlbigpLmFkZENsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHVibGljOiBwdWJsaWMsXG4gICAgaW5pdDogaW5pdFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbnVwQ29udHJvbGxlcjtcbiIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgU3R1ZGVudFNpZ251cENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXG4gIHZhciBwdWJsaWMgPSB7fTtcblxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcbiAgdmFyIGxvY2FsID0ge307XG5cbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb25zXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleHBvcnRzID0ge307XG5cbiAgICByZXR1cm4gZXhwb3J0c1xuICB9KSgpO1xuXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0TG9jYWwoKTtcbiAgICBldmVudExpc3RlbmVycygpO1xuXG4gICAgJCgnLmFsZXJ0JykuaGlkZSgpO1xuICB9XG5cbiAgdmFyIGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnI3N1Ym1pdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgZGF0YSA9IHsgbmFtZTogJCgnI2ZpcnN0TmFtZScpLnZhbCgpICsgXCIgXCIgKyAkKCcjbGFzdE5hbWUnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBlbWFpbDogJCgnI2VtYWlsJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQoJyNwYXNzJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgcGFzc3dvcmRDb25maXJtOiAkKCcjcGFzc0NvbmZpcm0nKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICB0eXBlOiAnU3R1ZGVudCdcbiAgICAgICAgICAgICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZSggZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuYWxlcnRNZXNzYWdlKSB7XG4gICAgICAgICAgJCgnI2FsZXJ0TWVzc2FnZScpLnRleHQoZGF0YS5hbGVydE1lc3NhZ2UpO1xuICAgICAgICAgICQoJy5hbGVydCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Byb2ZpbGUvY3JlYXRlJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0dWRlbnRTaWdudXBDb250cm9sbGVyO1xuIixudWxsLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpLmZpbHRlcihudWxscykuam9pbignICcpIDogdmFsO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8Zm9ybSBpZD1cXFwiZW1wbG95ZXJTaWdudXBGb3JtXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgaWQ9XFxcImZpcnN0TmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkZpcnN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IGlkPVxcXCJsYXN0TmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkxhc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcImNvbXBhbnlcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJDb21wYW55XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbWFpbCBhZGRyZXNzXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc1xcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NDb25maXJtXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGJ1dHRvbiBpZD1cXFwic3VibWl0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlNpZ24gVXA8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Zvcm0+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48ZGl2IHJvbGU9XFxcImFsZXJ0XFxcIiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlXFxcIj48ZGl2IGlkPVxcXCJhbGVydE1lc3NhZ2VcXFwiPmFsZXJ0IGdvZXMgaGVyZTwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cFxcXCI+PHNwYW4gY2xhc3M9XFxcImlucHV0LWdyb3VwLWFkZG9uXFxcIj5APC9zcGFuPjxpbnB1dCBpZD1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGJ1dHRvbiBpZD1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIEluPC9idXR0b24+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBpZD1cXFwic3R1ZGVudC10YWJcXFwiIGNsYXNzPVxcXCJjb2wtbWQtNiB0ZXh0LWNlbnRlclxcXCI+PGgzIGNsYXNzPVxcXCJzZWxlY3RvciBzZWxlY3RlZC10ZXh0XFxcIj5TdHVkZW50PC9oMz48L2Rpdj48ZGl2IGlkPVxcXCJlbXBsb3llci10YWJcXFwiIGNsYXNzPVxcXCJjb2wtbWQtNiB0ZXh0LWNlbnRlciBzZWxlY3RvclxcXCI+PGgzIGNsYXNzPVxcXCJzZWxlY3RvciB1bnNlbGVjdGVkLXRleHRcXFwiPkVtcGxveWVyPC9oMz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZVxcXCI+PGRpdiBpZD1cXFwiYWxlcnRNZXNzYWdlXFxcIj5hbGVydCBnb2VzIGhlcmU8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGlkPVxcXCJzaWdudXAtZm9ybS1jb250ZW50c1xcXCIgY2xhc3M9XFxcInJvd1xcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwiZmlyc3ROYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRmlyc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgaWQ9XFxcImxhc3ROYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiTGFzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwiZW1haWxcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbWFpbCBhZGRyZXNzXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc1xcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NDb25maXJtXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGJ1dHRvbiBpZD1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIFVwPC9idXR0b24+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyJdfQ==
