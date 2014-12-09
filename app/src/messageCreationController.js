// author: Sabrina Drammis, Sam Edson
var MessageCreationController = function() {

  // Public variables, available outside controller
  var public = {};

  // Private variables,
  var local = {};

  var setLocal = function() {
    local.messageModalTemplate = require('../../views/templates/mail/messageModal.jade');
    local.toName = null;
    local.toId   = null;
  }

  // Helper functions
  var helpers = (function() {
    var exports = {};

    exports.toggleModal = function () {
      $('.modal').modal('toggle');
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

    //load the message modal onto the screen
    $(document).on('click', '.createMessageBtn', function (e) {
      helpers.toggleModal();

      local.toName = $(this).attr('name');
      local.toId   = $(this).attr('id');

      $('.modal-title').text('To:  ' + $(this).attr('name'));
      $('#messageTitle').val("");
      $('#messageContent').val("");
    });
    
    //submit modal message 
    $(document).on('click', '#sendMessage', function () {
      if (local.toName === null && local.toId === null) return false;

      var toName  = local.toName;
      var toId    = local.toId;
      var title   = $('#messageTitle').val();
      var content = $('#messageContent').val();

      $.ajax({
        type: "POST",
        url: "/messages/" + toId,
        data: { to      : toName,
                content : content,
                title   : title
        },
        success: function(data) {
          $('.modal').modal('toggle');
        }
      })
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
