// author: Sabrina Drammis
var MessageCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};
    local.messageModalTemplate = require('../../views/templates/mail/messageModal.jade');
    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();
  }

  var eventListeners = function() {
  }

  return {
    public: public,
    init: init
  }
}

var messageCreationController = new MessageCreationController();
$(document).ready(function() {
  messageCreationController.init();
});
