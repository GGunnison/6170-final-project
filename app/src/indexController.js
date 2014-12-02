// TODO this is for the new index page that is under construction
// author: Sabrina Drammis
var IndexController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.loginTemplate  = require('../../views/templates/login.jade');
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
