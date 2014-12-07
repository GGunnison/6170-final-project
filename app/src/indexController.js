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
