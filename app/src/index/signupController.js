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

    //Change between student and Employer signup sections
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
