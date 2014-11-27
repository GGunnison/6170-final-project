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
