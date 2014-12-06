// author: Sabrina Drammis
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
      document.getElementById('signup-form-contents').innerHTML = studentSignupHTML;
    }

    exports.renderEmployerSignup = function() {
      var employerSignupHTML = local.employerSignupTemplate();
      document.getElementById('signup-form-contents').innerHTML = employerSignupHTML;
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    sizingJS();
    $(window).resize(responsiveJS);

    eventListeners();

    helpers.renderStudentSignup();
  }

  var sizingJS = function() {

  }

  var responsiveJS = function() {
    sizingJS();
  }

  var eventListeners = function() {
    console.log('events');
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
