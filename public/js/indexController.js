(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// author: Sabrina Drammis
var IndexController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.SignupController = require('./signupController');
    local.LoginController  = require('./loginController');
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
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    $('#login').click( function() {
      console.log('login');
      var loginController = new local.LoginController();
      // this order is important
      helpers.renderLogin();
      loginController.init();
    });

    $('#signup').click( function() {
      console.log('signup');
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

},{"../../views/templates/login.jade":9,"../../views/templates/signup.jade":10,"./loginController":3,"./signupController":4}],2:[function(require,module,exports){
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
        }
      }).success( function () {
        window.location = '/search';
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
    local.studentSignupTemplate    = require('../../views/templates/student-signup.jade');
    local.employerSignupTemplate   = require('../../views/templates/employer-signup.jade');
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

},{"../../views/templates/employer-signup.jade":8,"../../views/templates/student-signup.jade":11,"./employerSignupController":2,"./studentSignupController":5}],5:[function(require,module,exports){
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
        }
      }).success( function (user) {
        // login the user
        console.log('all good');
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

buf.push("<div class=\"row\"><div id=\"student-tab\" class=\"col-md-6 text-center\"><h4>Student</h4></div><div id=\"employer-tab\" class=\"col-md-6 text-center\"><h4>Employer</h4></div></div><div class=\"row\"><div class=\"col-md-12\"><div role=\"alert\" class=\"alert alert-danger alert-dismissible\"><div id=\"alertMessage\">alert goes here</div></div></div></div><div id=\"signup-form-contents\" class=\"row\"></div>");;return buf.join("");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2luZGV4Q29udHJvbGxlci5qcyIsImFwcC9zcmMvZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmpzIiwiYXBwL3NyYy9sb2dpbkNvbnRyb2xsZXIuanMiLCJhcHAvc3JjL3NpZ251cENvbnRyb2xsZXIuanMiLCJhcHAvc3JjL3N0dWRlbnRTaWdudXBDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJ2aWV3cy90ZW1wbGF0ZXMvZW1wbG95ZXItc2lnbnVwLmphZGUiLCJ2aWV3cy90ZW1wbGF0ZXMvbG9naW4uamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zaWdudXAuamFkZSIsInZpZXdzL3RlbXBsYXRlcy9zdHVkZW50LXNpZ251cC5qYWRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIEluZGV4Q29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbC5TaWdudXBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zaWdudXBDb250cm9sbGVyJyk7XG4gICAgbG9jYWwuTG9naW5Db250cm9sbGVyICA9IHJlcXVpcmUoJy4vbG9naW5Db250cm9sbGVyJyk7XG4gICAgbG9jYWwubG9naW5UZW1wbGF0ZSAgICA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9sb2dpbi5qYWRlJyk7XG4gICAgbG9jYWwuc2lnbnVwVGVtcGxhdGUgICA9IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9zaWdudXAuamFkZScpO1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgZXhwb3J0cy5yZW5kZXJMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxvZ2luSFRNTCA9IGxvY2FsLmxvZ2luVGVtcGxhdGUoKTtcbiAgICAgICQoJyNsb2dpbi1zaWdudXAtZm9ybScpLmh0bWwobG9naW5IVE1MKTtcbiAgICAgICQoJyNsb2dpbiAuc2xpZGUtYmFyJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAkKCcjc2lnbnVwIC5zbGlkZS1iYXInKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnJlbmRlclNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNpZ251cEhUTUwgPSBsb2NhbC5zaWdudXBUZW1wbGF0ZSgpO1xuICAgICAgJCgnI2xvZ2luLXNpZ251cC1mb3JtJykuaHRtbChzaWdudXBIVE1MKTtcbiAgICAgICQoJyNsb2dpbiAuc2xpZGUtYmFyJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAkKCcjc2lnbnVwIC5zbGlkZS1iYXInKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwb3J0c1xuICB9KSgpO1xuXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0TG9jYWwoKTtcblxuICAgIHNpemluZ0pTKCk7XG4gICAgJCh3aW5kb3cpLnJlc2l6ZShyZXNwb25zaXZlSlMpO1xuXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHZhciBzaXppbmdKUyA9IGZ1bmN0aW9uKCkge1xuXG4gIH1cblxuICB2YXIgcmVzcG9uc2l2ZUpTID0gZnVuY3Rpb24oKSB7XG4gICAgc2l6aW5nSlMoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNsb2dpbicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dpbicpO1xuICAgICAgdmFyIGxvZ2luQ29udHJvbGxlciA9IG5ldyBsb2NhbC5Mb2dpbkNvbnRyb2xsZXIoKTtcbiAgICAgIC8vIHRoaXMgb3JkZXIgaXMgaW1wb3J0YW50XG4gICAgICBoZWxwZXJzLnJlbmRlckxvZ2luKCk7XG4gICAgICBsb2dpbkNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3NpZ251cCcpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaWdudXAnKTtcbiAgICAgIHZhciBzaWdudXBDb250cm9sbGVyID0gbmV3IGxvY2FsLlNpZ251cENvbnRyb2xsZXIoKTtcbiAgICAgIC8vIHRoaXMgb3JkZXIgaXMgaW1wb3J0YW50XG4gICAgICBoZWxwZXJzLnJlbmRlclNpZ251cCgpO1xuICAgICAgc2lnbnVwQ29udHJvbGxlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1YmxpYzogcHVibGljLFxuICAgIGluaXQ6IGluaXRcbiAgfVxufVxuXG52YXIgaW5kZXhDb250cm9sbGVyID0gbmV3IEluZGV4Q29udHJvbGxlcigpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIGluZGV4Q29udHJvbGxlci5pbml0KCk7XG59KTtcbiIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXG52YXIgRW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxuICB2YXIgcHVibGljID0ge307XG5cbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXG4gIHZhciBsb2NhbCA9IHt9O1xuXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gICAgcmV0dXJuIGV4cG9ydHNcbiAgfSkoKTtcblxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldExvY2FsKCk7XG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICQoJy5hbGVydCcpLmhpZGUoKTtcbiAgfVxuXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIGRhdGEgPSB7IG5hbWU6ICQoJyNmaXJzdE5hbWUnKS52YWwoKSArIFwiIFwiICsgJCgnI2xhc3ROYW1lJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgZW1haWw6ICQoJyNlbWFpbCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkKCcjcGFzcycpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogJCgnI3Bhc3NDb25maXJtJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgY29tcGFueTogJCgnI2NvbXBhbnknKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICB0eXBlOiAnRW1wbG95ZXInXG4gICAgICAgICAgICAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmFsZXJ0TWVzc2FnZSkge1xuICAgICAgICAgICQoJyNhbGVydE1lc3NhZ2UnKS50ZXh0KGRhdGEuYWxlcnRNZXNzYWdlKTtcbiAgICAgICAgICAkKCcuYWxlcnQnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbXBsb3llclNpZ251cENvbnRyb2xsZXI7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIExvZ2luQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBkYXRhID0geyBlbWFpbDogJCgnI2VtYWlsJykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQoJyNwYXNzJykudmFsKClcbiAgICAgICAgICAgICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XG4gICAgICAgICAgJCgnLmFsZXJ0Jykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KS5zdWNjZXNzKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvc2VhcmNoJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpbkNvbnRyb2xsZXI7XG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xudmFyIFNpZ251cENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXG4gIHZhciBwdWJsaWMgPSB7fTtcblxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcbiAgdmFyIGxvY2FsID0ge307XG5cbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cENvbnRyb2xsZXIgID0gcmVxdWlyZSgnLi9zdHVkZW50U2lnbnVwQ29udHJvbGxlcicpO1xuICAgIGxvY2FsLmVtcGxveWVyU2lnbnVwQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vZW1wbG95ZXJTaWdudXBDb250cm9sbGVyJyk7XG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL3N0dWRlbnQtc2lnbnVwLmphZGUnKTtcbiAgICBsb2NhbC5lbXBsb3llclNpZ251cFRlbXBsYXRlICAgPSByZXF1aXJlKCcuLi8uLi92aWV3cy90ZW1wbGF0ZXMvZW1wbG95ZXItc2lnbnVwLmphZGUnKTtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIGV4cG9ydHMucmVuZGVyU3R1ZGVudFNpZ251cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0dWRlbnRTaWdudXBIVE1MID0gbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLWZvcm0tY29udGVudHMnKS5pbm5lckhUTUwgPSBzdHVkZW50U2lnbnVwSFRNTDtcbiAgICAgIHZhciBzdHVkZW50U2lnbnVwQ29udHJvbGxlciA9IG5ldyBsb2NhbC5zdHVkZW50U2lnbnVwQ29udHJvbGxlcigpO1xuICAgICAgc3R1ZGVudFNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGV4cG9ydHMucmVuZGVyRW1wbG95ZXJTaWdudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbXBsb3llclNpZ251cEhUTUwgPSBsb2NhbC5lbXBsb3llclNpZ251cFRlbXBsYXRlKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLWZvcm0tY29udGVudHMnKS5pbm5lckhUTUwgPSBlbXBsb3llclNpZ251cEhUTUw7XG4gICAgICB2YXIgZW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gbmV3IGxvY2FsLmVtcGxveWVyU2lnbnVwQ29udHJvbGxlcigpO1xuICAgICAgZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwb3J0c1xuICB9KSgpO1xuXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0TG9jYWwoKTtcbiAgICBldmVudExpc3RlbmVycygpO1xuXG4gICAgLy8gc3R1ZGVudCBzaWdudXAgaXMgZGVmYXVsdFxuICAgIGhlbHBlcnMucmVuZGVyU3R1ZGVudFNpZ251cCgpO1xuICB9XG5cbiAgdmFyIGV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnI3N0dWRlbnQtdGFiJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XG4gICAgfSk7XG5cbiAgICAkKCcjZW1wbG95ZXItdGFiJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgICAgaGVscGVycy5yZW5kZXJFbXBsb3llclNpZ251cCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaWdudXBDb250cm9sbGVyO1xuIiwiLy8gYXV0aG9yOiBTYWJyaW5hIERyYW1taXNcbnZhciBTdHVkZW50U2lnbnVwQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcbiAgdmFyIHB1YmxpYyA9IHt9O1xuXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxuICB2YXIgbG9jYWwgPSB7fTtcblxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcbiAgdmFyIGhlbHBlcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcblxuICAgIHJldHVybiBleHBvcnRzXG4gIH0pKCk7XG5cbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRMb2NhbCgpO1xuICAgIGV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XG4gIH1cblxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBkYXRhID0geyBuYW1lOiAkKCcjZmlyc3ROYW1lJykudmFsKCkgKyBcIiBcIiArICQoJyNsYXN0TmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkKCcjZW1haWwnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbmZpcm06ICQoJyNwYXNzQ29uZmlybScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTdHVkZW50J1xuICAgICAgICAgICAgICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XG4gICAgICAgICAgJCgnLmFsZXJ0Jykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KS5zdWNjZXNzKCBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAvLyBsb2dpbiB0aGUgdXNlclxuICAgICAgICBjb25zb2xlLmxvZygnYWxsIGdvb2QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwdWJsaWM6IHB1YmxpYyxcbiAgICBpbml0OiBpbml0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHVkZW50U2lnbnVwQ29udHJvbGxlcjtcbiIsbnVsbCwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuamFkZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKSA6IHZhbDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGZvcm0gaWQ9XFxcImVtcGxveWVyU2lnbnVwRm9ybVxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IGlkPVxcXCJmaXJzdE5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJGaXJzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwibGFzdE5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJMYXN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJjb21wYW55XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiQ29tcGFueVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWwgYWRkcmVzc1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzQ29uZmlybVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJDb25maXJtIHBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIFVwPC9idXR0b24+PC9kaXY+PC9kaXY+PC9mb3JtPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZVxcXCI+PGRpdiBpZD1cXFwiYWxlcnRNZXNzYWdlXFxcIj5hbGVydCBnb2VzIGhlcmU8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPjxzcGFuIGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hZGRvblxcXCI+QDwvc3Bhbj48aW5wdXQgaWQ9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWxcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2lnbiBJbjwvYnV0dG9uPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgaWQ9XFxcInN0dWRlbnQtdGFiXFxcIiBjbGFzcz1cXFwiY29sLW1kLTYgdGV4dC1jZW50ZXJcXFwiPjxoND5TdHVkZW50PC9oND48L2Rpdj48ZGl2IGlkPVxcXCJlbXBsb3llci10YWJcXFwiIGNsYXNzPVxcXCJjb2wtbWQtNiB0ZXh0LWNlbnRlclxcXCI+PGg0PkVtcGxveWVyPC9oND48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZVxcXCI+PGRpdiBpZD1cXFwiYWxlcnRNZXNzYWdlXFxcIj5hbGVydCBnb2VzIGhlcmU8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGlkPVxcXCJzaWdudXAtZm9ybS1jb250ZW50c1xcXCIgY2xhc3M9XFxcInJvd1xcXCI+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwiZmlyc3ROYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRmlyc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgaWQ9XFxcImxhc3ROYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiTGFzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwiZW1haWxcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbWFpbCBhZGRyZXNzXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxpbnB1dCBpZD1cXFwicGFzc1xcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJQYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NDb25maXJtXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGJ1dHRvbiBpZD1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIFVwPC9idXR0b24+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyJdfQ==
