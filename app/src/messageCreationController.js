// author: Sabrina Drammis
var MessageCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.messageModalTemplate = require('../../views/templates/mail/messageModal.jade');
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.renderModal = function() {
      var modalHTML = local.messageModalTemplate();
      $('body').append(modalHTML);
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();
  }

  var eventListeners = function() {
    $('#createMessageBtn').click( function() {

    });
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
