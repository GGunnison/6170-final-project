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

    $("#login-signup-form").delegate(".form-control", "keyup", function(e) {
      if (e.keyCode == 13) {
        console.log($("#submit"));
        $("#submit").click();
      }
    })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYXBwXFxzcmNcXGluZGV4Q29udHJvbGxlci5qcyIsImFwcFxcc3JjXFxpbmRleFxcZW1wbG95ZXJTaWdudXBDb250cm9sbGVyLmpzIiwiYXBwXFxzcmNcXGluZGV4XFxsb2dpbkNvbnRyb2xsZXIuanMiLCJhcHBcXHNyY1xcaW5kZXhcXHNpZ251cENvbnRyb2xsZXIuanMiLCJhcHBcXHNyY1xcaW5kZXhcXHN0dWRlbnRTaWdudXBDb250cm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxsaWJcXF9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlc1xcamFkZVxccnVudGltZS5qcyIsInZpZXdzXFx0ZW1wbGF0ZXNcXGluZGV4XFxlbXBsb3llci1zaWdudXAuamFkZSIsInZpZXdzXFx0ZW1wbGF0ZXNcXGluZGV4XFxsb2dpbi5qYWRlIiwidmlld3NcXHRlbXBsYXRlc1xcaW5kZXhcXHNpZ251cC5qYWRlIiwidmlld3NcXHRlbXBsYXRlc1xcaW5kZXhcXHN0dWRlbnQtc2lnbnVwLmphZGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGF1dGhvcjogU2FicmluYSBEcmFtbWlzXHJcbnZhciBJbmRleENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxyXG4gIHZhciBwdWJsaWMgPSB7fTtcclxuXHJcbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXHJcbiAgdmFyIGxvY2FsID0ge307XHJcblxyXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbG9jYWwuU2lnbnVwQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vaW5kZXgvc2lnbnVwQ29udHJvbGxlcicpO1xyXG4gICAgbG9jYWwuTG9naW5Db250cm9sbGVyICA9IHJlcXVpcmUoJy4vaW5kZXgvbG9naW5Db250cm9sbGVyJyk7XHJcbiAgICBsb2NhbC5sb2dpblRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi4vLi4vdmlld3MvdGVtcGxhdGVzL2luZGV4L2xvZ2luLmphZGUnKTtcclxuICAgIGxvY2FsLnNpZ251cFRlbXBsYXRlICAgPSByZXF1aXJlKCcuLi8uLi92aWV3cy90ZW1wbGF0ZXMvaW5kZXgvc2lnbnVwLmphZGUnKTtcclxuICB9XHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcclxuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBleHBvcnRzID0ge307XHJcblxyXG4gICAgZXhwb3J0cy5yZW5kZXJMb2dpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbG9naW5IVE1MID0gbG9jYWwubG9naW5UZW1wbGF0ZSgpO1xyXG4gICAgICAkKCcjbG9naW4tc2lnbnVwLWZvcm0nKS5odG1sKGxvZ2luSFRNTCk7XHJcbiAgICAgICQoJyNsb2dpbiAuc2xpZGUtYmFyJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICQoJyNzaWdudXAgLnNsaWRlLWJhcicpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydHMucmVuZGVyU2lnbnVwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzaWdudXBIVE1MID0gbG9jYWwuc2lnbnVwVGVtcGxhdGUoKTtcclxuICAgICAgJCgnI2xvZ2luLXNpZ251cC1mb3JtJykuaHRtbChzaWdudXBIVE1MKTtcclxuICAgICAgJCgnI2xvZ2luIC5zbGlkZS1iYXInKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJCgnI3NpZ251cCAuc2xpZGUtYmFyJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHNcclxuICB9KSgpO1xyXG5cclxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRMb2NhbCgpO1xyXG5cclxuICAgIGV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0byBoYXZpbmcgdGhlIGxvZ2luIHVwXHJcbiAgICB2YXIgbG9naW5Db250cm9sbGVyID0gbmV3IGxvY2FsLkxvZ2luQ29udHJvbGxlcigpO1xyXG4gICAgaGVscGVycy5yZW5kZXJMb2dpbigpO1xyXG4gICAgbG9naW5Db250cm9sbGVyLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI2xvZ2luJykuY2xpY2soIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbG9naW5Db250cm9sbGVyID0gbmV3IGxvY2FsLkxvZ2luQ29udHJvbGxlcigpO1xyXG4gICAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudFxyXG4gICAgICBoZWxwZXJzLnJlbmRlckxvZ2luKCk7XHJcbiAgICAgIGxvZ2luQ29udHJvbGxlci5pbml0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjc2lnbnVwJykuY2xpY2soIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2lnbnVwQ29udHJvbGxlciA9IG5ldyBsb2NhbC5TaWdudXBDb250cm9sbGVyKCk7XHJcbiAgICAgIC8vIHRoaXMgb3JkZXIgaXMgaW1wb3J0YW50XHJcbiAgICAgIGhlbHBlcnMucmVuZGVyU2lnbnVwKCk7XHJcbiAgICAgIHNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNsb2dpbi1zaWdudXAtZm9ybVwiKS5kZWxlZ2F0ZShcIi5mb3JtLWNvbnRyb2xcIiwgXCJrZXl1cFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygkKFwiI3N1Ym1pdFwiKSk7XHJcbiAgICAgICAgJChcIiNzdWJtaXRcIikuY2xpY2soKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwdWJsaWM6IHB1YmxpYyxcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbmRleENvbnRyb2xsZXIgPSBuZXcgSW5kZXhDb250cm9sbGVyKCk7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIGluZGV4Q29udHJvbGxlci5pbml0KCk7XHJcbn0pO1xyXG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xyXG52YXIgRW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcclxuICB2YXIgcHVibGljID0ge307XHJcblxyXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxyXG4gIHZhciBsb2NhbCA9IHt9O1xyXG5cclxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcclxuICB9XHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcclxuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBleHBvcnRzID0ge307XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHNcclxuICB9KSgpO1xyXG5cclxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRMb2NhbCgpO1xyXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBkYXRhID0geyBuYW1lOiAkKCcjZmlyc3ROYW1lJykudmFsKCkgKyBcIiBcIiArICQoJyNsYXN0TmFtZScpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgZW1haWw6ICQoJyNlbWFpbCcpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQoJyNwYXNzJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZENvbmZpcm06ICQoJyNwYXNzQ29uZmlybScpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgY29tcGFueTogJCgnI2NvbXBhbnknKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgIHR5cGU6ICdFbXBsb3llcidcclxuICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogJy9zaWdudXAnLFxyXG4gICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgfSkuZG9uZSggZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcclxuICAgICAgICAgICQoJyNhbGVydE1lc3NhZ2UnKS50ZXh0KGRhdGEuYWxlcnRNZXNzYWdlKTtcclxuICAgICAgICAgICQoJy5hbGVydCcpLmZhZGVJbig4MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Byb2ZpbGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwdWJsaWM6IHB1YmxpYyxcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW1wbG95ZXJTaWdudXBDb250cm9sbGVyO1xyXG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xyXG52YXIgTG9naW5Db250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vIFB1YmxpYyB2YXJpYWJsZXMsIGF2YWlsYWJsZSBvdXRzaWRlIGNvbnRyb2xsZXJcclxuICB2YXIgcHVibGljID0ge307XHJcblxyXG4gIC8vIFByaXZhdGUgdmFyaWFibGVzLFxyXG4gIHZhciBsb2NhbCA9IHt9O1xyXG5cclxuICB2YXIgc2V0TG9jYWwgPSBmdW5jdGlvbigpIHtcclxuICB9XHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnNcclxuICB2YXIgaGVscGVycyA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBleHBvcnRzID0ge307XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHNcclxuICB9KSgpO1xyXG5cclxuICAvLyBTdGFydHMgYWxsIHByb2Nlc3Nlc1xyXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRMb2NhbCgpO1xyXG4gICAgZXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAkKCcuYWxlcnQnKS5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBkYXRhID0geyBlbWFpbDogJCgnI2VtYWlsJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcclxuICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgIH0pLmRvbmUoIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYWxlcnRNZXNzYWdlKSB7XHJcbiAgICAgICAgICAkKCcjYWxlcnRNZXNzYWdlJykudGV4dChkYXRhLmFsZXJ0TWVzc2FnZSk7XHJcbiAgICAgICAgICAkKCcuYWxlcnQnKS5mYWRlSW4oODAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9zZWFyY2gnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwdWJsaWM6IHB1YmxpYyxcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9naW5Db250cm9sbGVyO1xyXG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xyXG52YXIgU2lnbnVwQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAvLyBQdWJsaWMgdmFyaWFibGVzLCBhdmFpbGFibGUgb3V0c2lkZSBjb250cm9sbGVyXHJcbiAgdmFyIHB1YmxpYyA9IHt9O1xyXG5cclxuICAvLyBQcml2YXRlIHZhcmlhYmxlcyxcclxuICB2YXIgbG9jYWwgPSB7fTtcclxuXHJcbiAgdmFyIHNldExvY2FsID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsb2NhbC5zdHVkZW50U2lnbnVwQ29udHJvbGxlciAgPSByZXF1aXJlKCcuL3N0dWRlbnRTaWdudXBDb250cm9sbGVyJyk7XHJcbiAgICBsb2NhbC5lbXBsb3llclNpZ251cENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2VtcGxveWVyU2lnbnVwQ29udHJvbGxlcicpO1xyXG4gICAgbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlICAgID0gcmVxdWlyZSgnLi4vLi4vLi4vdmlld3MvdGVtcGxhdGVzL2luZGV4L3N0dWRlbnQtc2lnbnVwLmphZGUnKTtcclxuICAgIGxvY2FsLmVtcGxveWVyU2lnbnVwVGVtcGxhdGUgICA9IHJlcXVpcmUoJy4uLy4uLy4uL3ZpZXdzL3RlbXBsYXRlcy9pbmRleC9lbXBsb3llci1zaWdudXAuamFkZScpO1xyXG4gIH1cclxuXHJcbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xyXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcclxuXHJcbiAgICBleHBvcnRzLnJlbmRlclN0dWRlbnRTaWdudXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHN0dWRlbnRTaWdudXBIVE1MID0gbG9jYWwuc3R1ZGVudFNpZ251cFRlbXBsYXRlKCk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXAtZm9ybS1jb250ZW50cycpLmlubmVySFRNTCA9IHN0dWRlbnRTaWdudXBIVE1MO1xyXG4gICAgICB2YXIgc3R1ZGVudFNpZ251cENvbnRyb2xsZXIgPSBuZXcgbG9jYWwuc3R1ZGVudFNpZ251cENvbnRyb2xsZXIoKTtcclxuICAgICAgc3R1ZGVudFNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydHMucmVuZGVyRW1wbG95ZXJTaWdudXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGVtcGxveWVyU2lnbnVwSFRNTCA9IGxvY2FsLmVtcGxveWVyU2lnbnVwVGVtcGxhdGUoKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ251cC1mb3JtLWNvbnRlbnRzJykuaW5uZXJIVE1MID0gZW1wbG95ZXJTaWdudXBIVE1MO1xyXG4gICAgICB2YXIgZW1wbG95ZXJTaWdudXBDb250cm9sbGVyID0gbmV3IGxvY2FsLmVtcGxveWVyU2lnbnVwQ29udHJvbGxlcigpO1xyXG4gICAgICBlbXBsb3llclNpZ251cENvbnRyb2xsZXIuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBleHBvcnRzXHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gU3RhcnRzIGFsbCBwcm9jZXNzZXNcclxuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0TG9jYWwoKTtcclxuICAgIGV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgLy8gc3R1ZGVudCBzaWdudXAgaXMgZGVmYXVsdFxyXG4gICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNzdHVkZW50LXRhYicpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgICAgaGVscGVycy5yZW5kZXJTdHVkZW50U2lnbnVwKCk7XHJcblxyXG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ3Vuc2VsZWN0ZWQtdGV4dCcpO1xyXG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuYWRkQ2xhc3MoJ3NlbGVjdGVkLXRleHQnKTtcclxuXHJcbiAgICAgICQoJyNlbXBsb3llci10YWInKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZC10ZXh0Jyk7XHJcbiAgICAgICQoJyNlbXBsb3llci10YWInKS5jaGlsZHJlbigpLmFkZENsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNlbXBsb3llci10YWInKS5jbGljayggZnVuY3Rpb24oKSB7XHJcbiAgICAgIGhlbHBlcnMucmVuZGVyRW1wbG95ZXJTaWdudXAoKTtcclxuXHJcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygndW5zZWxlY3RlZC10ZXh0Jyk7XHJcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5hZGRDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xyXG5cclxuICAgICAgJCgnI3N0dWRlbnQtdGFiJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQtdGV4dCcpO1xyXG4gICAgICAkKCcjc3R1ZGVudC10YWInKS5jaGlsZHJlbigpLmFkZENsYXNzKCd1bnNlbGVjdGVkLXRleHQnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHB1YmxpYzogcHVibGljLFxyXG4gICAgaW5pdDogaW5pdFxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaWdudXBDb250cm9sbGVyO1xyXG4iLCIvLyBhdXRob3I6IFNhYnJpbmEgRHJhbW1pc1xyXG52YXIgU3R1ZGVudFNpZ251cENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8gUHVibGljIHZhcmlhYmxlcywgYXZhaWxhYmxlIG91dHNpZGUgY29udHJvbGxlclxyXG4gIHZhciBwdWJsaWMgPSB7fTtcclxuXHJcbiAgLy8gUHJpdmF0ZSB2YXJpYWJsZXMsXHJcbiAgdmFyIGxvY2FsID0ge307XHJcblxyXG4gIHZhciBzZXRMb2NhbCA9IGZ1bmN0aW9uKCkge1xyXG4gIH1cclxuXHJcbiAgLy8gSGVscGVyIGZ1bmN0aW9uc1xyXG4gIHZhciBoZWxwZXJzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0c1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFN0YXJ0cyBhbGwgcHJvY2Vzc2VzXHJcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHNldExvY2FsKCk7XHJcbiAgICBldmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICQoJy5hbGVydCcpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIHZhciBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI3N1Ym1pdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIGRhdGEgPSB7IG5hbWU6ICQoJyNmaXJzdE5hbWUnKS52YWwoKSArIFwiIFwiICsgJCgnI2xhc3ROYW1lJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICBlbWFpbDogJCgnI2VtYWlsJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJCgnI3Bhc3MnKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ29uZmlybTogJCgnI3Bhc3NDb25maXJtJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICB0eXBlOiAnU3R1ZGVudCdcclxuICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogJy9zaWdudXAnLFxyXG4gICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgfSkuZG9uZSggZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5hbGVydE1lc3NhZ2UpIHtcclxuICAgICAgICAgICQoJyNhbGVydE1lc3NhZ2UnKS50ZXh0KGRhdGEuYWxlcnRNZXNzYWdlKTtcclxuICAgICAgICAgICQoJy5hbGVydCcpLmZhZGVJbig4MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Byb2ZpbGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwdWJsaWM6IHB1YmxpYyxcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3R1ZGVudFNpZ251cENvbnRyb2xsZXI7XHJcbiIsbnVsbCwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuamFkZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKSA6IHZhbDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGZvcm0gaWQ9XFxcImVtcGxveWVyU2lnbnVwRm9ybVxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IGlkPVxcXCJmaXJzdE5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJGaXJzdCBuYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPjxpbnB1dCBpZD1cXFwibGFzdE5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJMYXN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJjb21wYW55XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiQ29tcGFueVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWwgYWRkcmVzc1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzQ29uZmlybVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJDb25maXJtIHBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIj5TaWduIFVwPC9idXR0b24+PC9kaXY+PC9kaXY+PC9mb3JtPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiByb2xlPVxcXCJhbGVydFxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZVxcXCI+PGRpdiBpZD1cXFwiYWxlcnRNZXNzYWdlXFxcIj5hbGVydCBnb2VzIGhlcmU8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXBcXFwiPjxzcGFuIGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hZGRvblxcXCI+QDwvc3Bhbj48aW5wdXQgaWQ9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWxcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2lnbiBJbjwvYnV0dG9uPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgaWQ9XFxcInN0dWRlbnQtdGFiXFxcIiBjbGFzcz1cXFwiY29sLW1kLTYgdGV4dC1jZW50ZXJcXFwiPjxoMyBjbGFzcz1cXFwic2VsZWN0b3Igc2VsZWN0ZWQtdGV4dFxcXCI+U3R1ZGVudDwvaDM+PC9kaXY+PGRpdiBpZD1cXFwiZW1wbG95ZXItdGFiXFxcIiBjbGFzcz1cXFwiY29sLW1kLTYgdGV4dC1jZW50ZXIgc2VsZWN0b3JcXFwiPjxoMyBjbGFzcz1cXFwic2VsZWN0b3IgdW5zZWxlY3RlZC10ZXh0XFxcIj5FbXBsb3llcjwvaDM+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiIGNsYXNzPVxcXCJhbGVydCBhbGVydC1kYW5nZXJcXFwiPjxkaXYgaWQ9XFxcImFsZXJ0TWVzc2FnZVxcXCI+YWxlcnQgZ29lcyBoZXJlPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBpZD1cXFwic2lnbnVwLWZvcm0tY29udGVudHNcXFwiIGNsYXNzPVxcXCJyb3dcXFwiPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj48aW5wdXQgaWQ9XFxcImZpcnN0TmFtZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkZpcnN0IG5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+PGlucHV0IGlkPVxcXCJsYXN0TmFtZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkxhc3QgbmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcImVtYWlsXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW1haWwgYWRkcmVzc1xcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj48aW5wdXQgaWQ9XFxcInBhc3NcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+PGlucHV0IGlkPVxcXCJwYXNzQ29uZmlybVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJDb25maXJtIHBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPjxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+U2lnbiBVcDwvYnV0dG9uPjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiXX0=
