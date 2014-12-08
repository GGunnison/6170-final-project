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

    exports.toggleModal = function () {
      $('.modal').modal('toggle');
      // set the modal information
    }

    return exports
  })();

  // Starts all processes
  var init = function() {
    setLocal();

    eventListeners();

    var modalHTML = local.messageModalTemplate();
    $('body').append(modalHTML);
  }

  var eventListeners = function() {
    $('#createMessageBtn').click( function() {
      helpers.toggleModal();
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
